require('dotenv').config();

module.exports = { 
    getDataBaseConfig,
    getToken

}

let config = {}

loadConfig();

function loadConfig() {
    //Read config from file. NOW is a mock
    config = {
        db: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        },
        token: process.env.ADMIN_TOKEN
    }
}   


function getToken() {
    return config.token;
}

function getDataBaseConfig() {
    return config.db;
}

