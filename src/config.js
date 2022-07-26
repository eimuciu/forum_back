require('dotenv').config();
const { MongoClient } = require('mongodb');

const dbClient = new MongoClient(process.env.MONGO_DB);
const PORT = process.env.SERVER_PORT || 8080;

module.exports = { PORT, dbClient };
