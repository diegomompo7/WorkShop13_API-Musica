console.log(`
----------------------------
::: Conectando a la BBDD :::
----------------------------
`);
require("dotenv").config();

const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;

const mongoose = require("mongoose");

// Configuracion de la conexion
const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  dbName: DB_NAME
};

const connect = async () => {
  const database = await mongoose.connect(DB_URL, config);
  const name = database.connection.name;
  const host = database.connection.host;
  console.log(`
Conexión establecida: 
BBDD: ${name} 
DIRECCION: ${host}`);
  return database;
};

module.exports = { connect };
