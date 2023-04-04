const mysql = require('mysql');
const util = require('util');

// create connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'data',
});

// Promisify connection query method
const query = util.promisify(connection.query).bind(connection);

async function createTables() {
  try {
    // create account table
    await query(`CREATE TABLE IF NOT EXISTS account (
      account_number INT(11) NOT NULL PRIMARY KEY,
      balance DECIMAL(10, 2) NOT NULL
    )`);

    console.log('Account table created successfully');

    // create account_changes table
    await query(`CREATE TABLE IF NOT EXISTS account_changes (
      change_number INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
      account_number INT(11) NOT NULL,
      amount DECIMAL(10, 2) NOT NULL,
      changed_date DATE NOT NULL,
      remark VARCHAR(255),
      FOREIGN KEY (account_number) REFERENCES account(account_number)
    )`);

    console.log('Account_changes table created successfully');
  } catch (error) {
    console.error(error);
  } finally {
    // close connection
    connection.end();
  }
}

createTables();