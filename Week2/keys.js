const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'University',
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL server');
});

connection.query('ALTER TABLE mentors DROP FOREIGN KEY mentors_ibfk_1', (err, result) => {
  if (err) throw err;
  console.log('Foreign key dropped');
});


// Drop the authors table if it exists
connection.query('DROP TABLE IF EXISTS authors', (err, result) => {
  if (err) throw err;
  console.log('Authors table dropped');
});

// Create the authors table
const createAuthors = `CREATE TABLE authors (
  author_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  paper_title VARCHAR(255),
  conference VARCHAR(255),
  publish_date DATE,
  mentor_name VARCHAR(255)
)`;
connection.query(createAuthors, (err, result) => {
  if (err) throw err;
  console.log('Authors table created');
});

// Drop the mentors table if it exists
connection.query('DROP TABLE IF EXISTS mentors', (err, result) => {
  if (err) throw err;
  console.log('Mentors table dropped');
});

// Create the mentors table
const createMentors = `CREATE TABLE mentors (
  mentor_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  mentor_name VARCHAR(255),
  author_id INT,
  FOREIGN KEY (author_id) REFERENCES authors (author_id)
)`;
connection.query(createMentors, (err, result) => {
  if (err) throw err;
  console.log('Mentors table created');
});

// Insert data into the authors table
const insertAuthorsData = `INSERT INTO authors (paper_title, conference, publish_date, mentor_name)
  VALUES
  ('Water', 'Amsterdam', '1988-02-23', 'Ana'),
  ('Earth', 'Rotterdam', '2002-09-11', 'Maria'),
  ('Fire', 'Utrecht', '2020-12-04', 'Ali'),
  ('Air', 'Groningen', '2022-07-06', 'Arthur'),
  ('Avatar', 'Zaandam', '2023-01-30', 'Simone')`;
connection.query(insertAuthorsData, (err, result) => {
  if (err) throw err;
  console.log('Authors data inserted');
});

// Insert data into the mentors table
const insertMentorsData = `INSERT INTO mentors (mentor_name, author_id)
  VALUES
  ('Ana', 1),
  ('Maria', 2),
  ('Ali', 3),
  ('Arthur', 4),
  ('Simone', 5)`;
connection.query(insertMentorsData, (err, result) => {
  if (err) throw err;
  console.log('Mentors data inserted');
});

// Close the database connection
connection.end((error) => {
  if (error) throw error;
  console.log('Connection closed.');
});