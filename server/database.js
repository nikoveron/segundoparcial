import mysql from 'mysql2';
import { MongoClient } from 'mongodb';

// Función para crear la conexión a MySQL
function createMySQLConnection() {
  const host = process.env.MYSQL_HOST || 'database';
  const user = process.env.MYSQL_USER || 'root';
  const password = process.env.MYSQL_PASSWORD || 'root';
  const database = process.env.MYSQL_DATABASE || 'formosa';

  const connection = mysql.createConnection({
    host,
    user,
    password,
    database
  });

  return connection;
}

// Función para crear la conexión a MongoDB
async function createMongoConnection() {
  const url = 'mongodb://localhost:27017';
  const dbName = 'formosa';

  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db(dbName);
    return db;
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    throw error;
  }
}

export { createMySQLConnection, createMongoConnection };
