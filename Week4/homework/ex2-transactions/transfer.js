require('dotenv').config();

const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URL);

async function transfer(client, fromAccount, toAccount, amount, remark) {
  const accountCollection = client.db('databaseWeek4').collection('account');
  const session = client.startSession();
  try {
    await session.withTransaction(async () => {
      // Remove from fromAccount
      const fromAccountDoc = await accountCollection.findOne({
        account_number: fromAccount,
      });

      if (fromAccountDoc.balance < amount) {
        console.log('Insufficient balance to complete transfer.');
        return;
      }

      await accountCollection.updateOne(
        { account_number: fromAccount },
        { $inc: { balance: amount * -1 } },
        { session }
      );
      await accountCollection.updateOne(
        { account_number: fromAccount },
        {
          $push: {
            account_changes: {
              change_number: fromAccountDoc.account_changes.length + 1,
              amount: -amount,
              changed_date: new Date(),
              remark: remark,
            },
          },
        },
        { session }
      );

      // Add to toAccount
      const toAccountDoc = await accountCollection.findOne({
        account_number: toAccount,
      });
      await accountCollection.updateOne(
        { account_number: toAccount },
        { $inc: { balance: amount } },
        { session }
      );
      await accountCollection.updateOne(
        { account_number: toAccount },
        {
          $push: {
            account_changes: {
              change_number: toAccountDoc.account_changes.length + 1,
              amount: amount,
              changed_date: new Date(),
              remark: remark,
            },
          },
        },
        { session }
      );
      console.log(
        `Transferred ${amount} euros from account ${fromAccount} to account ${toAccount}.`
      );
    });
  } catch (e) {
    await session.abortTransaction();
  } finally {
    await session.endSession();
  }
}

async function execute() {
  try {
    await client.connect();
    await transfer(
      client,
      101,
      102,
      1000,
      'Transfer from account 101 to account 102'
    );
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
execute().catch(console.error);