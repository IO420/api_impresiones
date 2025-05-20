require('dotenv').config();

const {
    PORT = 5000,
    JWT_SECRET,
    DB_HOST,
    DB_USER,
    DB_PORT,
    DB_PASSWORD,
    DB_NAME
} = process.env

const envConfig = {
    port: PORT,
    jwtSecret: JWT_SECRET,
    db: {
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
        name: DB_NAME
    }
};

module.exports = envConfig;