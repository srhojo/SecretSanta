const express = require('express')
const cors = require('cors');
const playerService = require('./src/services/players.service')
const config = require('./src/configuration/global.config')
const app = express()
const port = 3101



const path = require('path')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Routes static files
app.use('/', express.static(path.join(__dirname, 'public')))


// Middleware para verificar el token de autorización
app.use(async (req, res, next) => {
    // Lista de rutas que no requieren autenticación
    const publicRoutes = ['/api/public'];

    
    if (req.path.includes('public')) {
        // Si la ruta no requiere autenticación, pasa al siguiente middleware
        next();
    } else {
        // Si la ruta requiere autenticación, verifica el token
        const token = req.headers.authorization;
        if (!checkBearerToken(token)) {
            res.status(401).send({
                error: 'Unauthorized',
                message: 'You are not authorized to access this resource'
            });
        } else {
            // Si el token es válido, pasa al siguiente middleware
            next();
        }
    }
});

// Routes api
//// Products
app.get('/api/public/players', async (req, res) => {
     res.json(await playerService.getPlayerList())
});

app.get('/api/public/players/who-not-played-yet', async (req, res) => {
    res.json(await playerService.getPlayersWhoNotPlayedYet())
});

app.get('/api/players/:id', async (req, res) => {
    res.json(await playerService.getPlayerById(req.params.id));
});

app.post('/api/players', async (req, res) => {
    res.json(await playerService.addPlayer(req.body))
});

app.delete('/api/players/:id', async (req, res) => {
    res.json(await playerService.removePlayer(req.params.id))
});

app.post('/api/public/players/play-secret-santa', async (req, res) => {
    const { playerId } = req.body;
    try {
        if (!playerId) {
            throw new Error('Player id is required');
        }
    } catch (err) {
        res.status(400).send({
            error: 'Bad request',
            message: err.message
        });
    }

    try {
        res.json(await playerService.playSecretSanta(playerId))
    }
    catch (err) {
        res.status(400).send({
            error: 'Bad request',
            message: err.message
        });
    }
});

app.post('/api/players/reset', async (req, res) => {
    await playerService.resetPlayers()
    res.status(204).send();
} );



// our custom JSON 404 middleware. Since it's placed last
// it will be the last middleware called, if all others
// invoke next() and do not respond.
app.use(function (req, res) {
    res.status(404);
    res.send({ error: "Sorry, can't find that" })
});

app.listen(port, () => {
    console.log(`Example app listen on port ${port}`)
})


function checkBearerToken(token) {
    return `Bearer ${config.getToken()}` === token;
}