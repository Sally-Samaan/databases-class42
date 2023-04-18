require('dotenv').config();

const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URL);

// Data
const accountData = [
  {
    account_number: 101,
    balance: 10000.0,
    account_changes: [
      {
        change_number: 1,
        amount: 10000.0,
        changed_date: new Date('2023-04-03'),
        remark: 'Initial balance',
      },
    ],
  },
  {
    account_number: 102,
    balance: 5000.0,
    account_changes: [
      {
        change_number: 1,
        amount: 5000.0,
        changed_date: new Date('2023-04-03'),
        remark: 'Initial balance',
      },
    ],
  },
  {
    account_number: 103,
    balance: 7000.0,
    account_changes: [
      {
        change_number: 1,
        amount: 7000.0,
        changed_date: new Date('2023-04-03'),
        remark: 'Initial balance',
      },
    ],
  },
];

// Main Function
async function main() {
  try {
    await client.connect();
    await cleanUpAccounts(client);
    await insertAccountData(client, accountData);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
main().catch(console.error);

// Utilities
async function cleanUpAccounts(client) {
  const result = await client
    .db('databaseWeek4')
    .collection('account')
    .deleteMany({});
  console.log(`${result.deletedCount} document(s) was/were deleted`);
}

async function insertAccountData(client, accountData) {
  const result = await client
    .db('databaseWeek4')
    .collection('account')
    .insertMany(accountData);
  console.log(
    `${result.insertedCount} new account(s) created with following id(s):`
  );
  console.log(result.insertedIds);
}

module.exports = { main };