const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
});

const createDatabase = async () => {
  try {
    await new Promise((resolve, reject) => {
      connection.connect((error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });

    console.log('Connected to MySQL server!');

    await new Promise((resolve, reject) => {
      connection.query('CREATE DATABASE IF NOT EXISTS data', (error, result) => {
        if (error) {
          reject(error);
        } else {
          console.log('Database "data" created!');
          resolve();
        }
      });
    });
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
};

createDatabase();