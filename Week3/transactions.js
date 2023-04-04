const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'data',
});

(async function() {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const fromAccount = 101;
    const toAccount = 102;
    const amount = 1000;

    const [fromResult] = await connection.execute(
      'SELECT balance FROM account WHERE account_number = ?',
      [fromAccount]
    );

    if (fromResult.length === 0) {
      throw new Error(`Account ${fromAccount} does not exist.`);
    }

    const fromBalance = fromResult[0].balance;

    if (fromBalance < amount) {
      throw new Error(`Insufficient balance in account ${fromAccount}.`);
    }

    const [updateFromResult] = await connection.execute(
      'UPDATE account SET balance = balance - ? WHERE account_number = ?',
      [amount, fromAccount]
    );

    if (updateFromResult.affectedRows !== 1) {
      throw new Error(`Failed to update account ${fromAccount}.`);
    }

    const [updateToResult] = await connection.execute(
      'UPDATE account SET balance = balance + ? WHERE account_number = ?',
      [amount, toAccount]
    );

    if (updateToResult.affectedRows !== 1) {
      throw new Error(`Failed to update account ${toAccount}.`);
    }

    const remark = `Transfer from account ${fromAccount} to account ${toAccount}.`;
    const values = [fromAccount, -amount, new Date(), remark];

    const [insertResult] = await connection.execute(
      'INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES (?, ?, ?, ?)',
      values
    );

    if (insertResult.affectedRows !== 1) {
      throw new Error(`Failed to log the transaction in account_changes.`);
    }

    await connection.commit();

    console.log(`Transaction complete. Transferred ${amount} from account ${fromAccount} to account ${toAccount}.`);
  }
  catch (error) {
    await connection.rollback();
    console.log(error.message);
  }
  finally {
    connection.release();
  }
})();