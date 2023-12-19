const config = require('../configuration/global.config');
const util = require('util');
const mysql = require('mysql');
const { v4: uuidv4 } = require('uuid');


//let connection = null;
console.log('Init database connection');
// Create a connection
const connection = mysql.createConnection(config.getDataBaseConfig());
connection.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected to the database');
});

// Promisify the query method
const query = util.promisify(connection.query).bind(connection);

module.exports = {
    getPlayerList,
    getPlayersWhoNotPlayedYet,
    getPlayerById,
    addPlayer,
    removePlayer,
    playSecretSanta,
    resetPlayers
};

async function getPlayerList() {
    console.log('Get player list');
    let playerList = [];

    try {
        // Execute a query
        const results = await query('SELECT * FROM SECRET_SANTA_PLAYER');
        console.log('Query results:', results);
        playerList = results;
    } catch (err) {
        console.error('Error:', err);
    }

    return playerList;
}


async function getPlayersWhoNotPlayedYet() {
    console.log('Get player list');
    let playerList = [];

    try {
        // Execute a query
        const results = await query('SELECT * FROM SECRET_SANTA_PLAYER WHERE HAS_PLAYED = 0');
        console.log('Query results:', results);
        playerList = results;
    } catch (err) {
        console.error('Error:', err);
    }

    return playerList;
}

async function getPlayerById(id) {
    console.log('Get player by id');
    let player = null;

    try {
        // Execute a query
        const results = await query('SELECT * FROM SECRET_SANTA_PLAYER WHERE ID = ?', [id]);
        console.log('Query results:', results);
        player = results[0];
    } catch (err) {
        console.error('Error:', err);
    }

    return player;
}   

async function addPlayer(player) {
    console.log('Add player');
    let result = null;

    try {
        // Execute a query
        const results = await query('INSERT INTO SECRET_SANTA_PLAYER SET ?', player);
        console.log('Query results:', results);
        result = results;
    } catch (err) {
        console.error('Error:', err);
    }

    return result;
}

async function removePlayer() {
    console.log('Remove player');
    let result = null;

    try {
        // Execute a query
        const results = await query('DELETE FROM SECRET_SANTA_PLAYER WHERE ID = ?', [id]);
        console.log('Query results:', results);
        result = results;
    } catch (err) {
        console.error('Error:', err);
    }

    return result;
}


async function playSecretSanta(playerId) {
    console.log('Play secret santa');
    let result = null;

    try {
        // Start a transaction
        await query('START TRANSACTION');

        // Execute a query
        const playerPlaying = await getPlayerById(playerId);
        const playerSelectedResults = await query('SELECT * FROM SECRET_SANTA_PLAYER WHERE HAS_BEEN_SELECTED = 0 AND id != ? ORDER BY RAND() LIMIT 1', [playerId]);
        if (playerSelectedResults.length === 1) {
            playerSelected = playerSelectedResults[0];
            const randomUUID = uuidv4();
            await query('INSERT INTO SECRET_SANTA_MOVE SET ?', {id: randomUUID, player_id: playerPlaying.ID, player_name: playerPlaying.NAME, selected_player_id: playerSelected.ID, selected_player_name: playerSelected.NAME, date: new Date() });
            await query('UPDATE SECRET_SANTA_PLAYER SET HAS_BEEN_SELECTED = 1 WHERE ID = ?', [playerSelected.ID]);
            await query('UPDATE SECRET_SANTA_PLAYER SET HAS_PLAYED = 1, MOVE_ID = ? WHERE ID = ?', [randomUUID, playerPlaying.ID]);
            
            // Commit the transaction
            await query('COMMIT');
            
            result = {
                selectedName: playerSelected.NAME,
                selectedId: playerSelected.ID
            }
        }


    } catch (err) {
        console.error('Error:', err);

        // Rollback the transaction in case of error
        await query('ROLLBACK');
    }
    console.log('Query results:', result);
    return result;
}

async function resetPlayers() {
    console.log('Reset players');
    try {
        // Start a transaction
        await query('START TRANSACTION');

        // Execute a query
        const saveMoves = await query('SELECT * FROM SECRET_SANTA_MOVE');

        // Execute a query
        await query('INSERT INTO SECRET_SANTA_MOVE_HISTORY SET ?', {id: uuidv4(), date: new Date(), moves: JSON.stringify(saveMoves)});
        await query ('DELETE FROM SECRET_SANTA_MOVE');

        await query('UPDATE SECRET_SANTA_PLAYER SET HAS_PLAYED = 0, HAS_BEEN_SELECTED = 0, MOVE_ID = NULL');
        
        // Commit the transaction
        await query('COMMIT');
        console.log('Reset players done');

        

    } catch (err) {
        console.error('Error:', err);
        // Rollback the transaction in case of error
        await query('ROLLBACK');
    }

}
