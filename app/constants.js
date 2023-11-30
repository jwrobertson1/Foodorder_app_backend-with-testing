const JWT_SECRET_KEY = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy';

const SERVER_PORT = 8080;

const DATABASE_URI = 'mongodb+srv://Jwrobertson81:Delaware1@cluster1.yz6bafc.mongodb.net/?retryWrites=true&w=majority'

const TOKEN_EXPIRATION_DURATION = '7d';

module.exports = {
    JWT_SECRET_KEY,
    SERVER_PORT,
    DATABASE_URI,
    TOKEN_EXPIRATION_DURATION
}