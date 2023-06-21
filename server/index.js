import express from 'express';
import mysql from 'mysql2';
import { MongoClient } from 'mongodb';

const app = express();

app.get('/check-mysql-connection', async (req, res) => {
  try {
    const connection = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    await new Promise((resolve, reject) => {
      connection.connect((err) => {
        if (err) {
          console.error('Error connecting to MySQL:', err);
          reject(err);
        } else {
          console.log('Connected to MySQL');
          resolve();
        }
      });
    });

    res.json({
      message: 'Connected to MySQL',
    });
  } catch (err) {
    console.error('Error connecting to MySQL:', err);
    res.status(500).json({
      message: 'Error connecting to MySQL',
    });
  }
});

app.get('/check-mongodb-connection', async (req, res) => {
  try {
    const uri = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      auth: {
        user: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD,
      },
    });

    await client.connect();

    console.log('Connected to MongoDB');
    res.json({
      message: 'Connected to MongoDB',
    });
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    res.status(500).json({
      message: 'Error connecting to MongoDB',
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
