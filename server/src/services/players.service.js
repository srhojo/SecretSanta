const database = require('../data/secret-santa.data');
const { v4: uuidv4 } = require('uuid');


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
    return await database.getPlayerList();
}

async function getPlayersWhoNotPlayedYet() {
    return await database.getPlayersWhoNotPlayedYet();
}

async function getPlayerById(id) {
    return await database.getPlayerById(id);
}

async function addPlayer(player) {
    const uuid = uuidv4();
    player.id = uuid;
    await database.addPlayer(player);
    return database.getPlayerById(uuid);
}

async function removePlayer(id) {
    return await database.removePlayer(id);
}

async function playSecretSanta(playerId) {
    // TODO: Check if there are enough players to play
    // TODO: Check if players have played before

    const player = await database.getPlayerById(playerId);
    if (!player) {
        throw new Error('Player not found');
    }

    if (player.HAS_PLAYED) {
        throw new Error('Player has already played');
    }

    database.playSecretSanta(playerId).then((response) => {
        if (!response) {
            //No quedan más jugadores?            
            throw new Error('Error playing secret santa');
        }

    }).catch((err) => {
        console.error('Error:', err);
    });


    return await database.playSecretSanta(playerId);
}

async function resetPlayers() {
    await database.resetPlayers();
}

