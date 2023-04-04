const mysql = require('mysql');

// create connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'data',
});

(async function () {
  try {
    // insert data into account table
    await queryPromise(connection, `INSERT INTO account (account_number, balance)
      VALUES (101, 5000), (102, 3000), (103, 7000)`);
    console.log('Data inserted into account table successfully');

    // insert data into account_changes table
    await queryPromise(connection, `INSERT INTO account_changes (account_number, amount, changed_date, remark)
      VALUES (101, 1000, NOW(), 'Transfer to account 102')`);
    console.log('Data inserted into account_changes table successfully');
  } catch (error) {
    console.error(error);
  } finally {
    // close connection
    connection.end();
  }
})();

function queryPromise(connection, sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}