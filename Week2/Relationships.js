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

// Drop the research_Papers table if it exists
connection.query('DROP TABLE IF EXISTS research_Papers', (err, result) => {
  if (err) throw err;
  console.log('Research_Papers table dropped');
});

// Create the research_Papers table
const createResearch_Papers = `CREATE TABLE research_Papers (
  paper_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  paper_title VARCHAR(255),
  conference VARCHAR(255),
  publish_date DATE,
  mentor_name VARCHAR(255)
)`;
connection.query(createResearch_Papers, (err, result) => {
  if (err) throw err;
  console.log('Research_Papers table created');
});

// Create the authorship table
const createAuthorship = `CREATE TABLE authorship (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  author_id INT,
  paper_id INT,
  FOREIGN KEY (author_id) REFERENCES authors(author_id),
  FOREIGN KEY (paper_id) REFERENCES research_Papers(paper_id)
)`;

// Insert data into the authors table
const insertAuthorsData = `INSERT INTO authors (paper_title, conference, publish_date, mentor_name)
  VALUES
  ('Water', 'Amsterdam', '1988-02-23', 'Ana'),
  ('Earth', 'Rotterdam', '2002-09-11', 'Maria'),
  ('Fire', 'Utrecht', '2020-12-04', 'Ali'),
  ('Air', 'Groningen', '2022-07-06', 'Arthur'),
  ('Avatar', 'Zaandam', '2023-01-30', 'Simone'),
  ('Sun', 'Eindhoven', '2015-05-12', 'Tom'),
  ('Moon', 'Maastricht', '2011-11-21', 'Lisa'),
  ('Stars', 'Nijmegen', '2016-03-09', 'Mario'),
  ('Clouds', 'Den Haag', '2008-08-16', 'Julia'),
  ('Rain', 'Tilburg', '2017-10-27', 'Mike'),
  ('Snow', 'Breda', '2013-02-08', 'Helen'),
  ('Thunder', 'Leiden', '2019-09-18', 'Peter'),
  ('Lightning', 'Amersfoort', '2006-06-25', 'Sophie'),
  ('Fog', 'Assen', '2014-01-02', 'David'),
  ('Storm', 'Enschede', '2010-04-07', 'Emma')`;
connection.query(insertAuthorsData, (err, result) => {
  if (err) throw err;
  console.log('Authors data inserted');
});

// Insert data into the research_Papers table
const insertResearchPapersData = `INSERT INTO research_Papers (paper_title, conference, publish_date, mentor_name)
  VALUES
  ('Paper 1', 'Conference A', '2022-01-01', 'Ana'),
  ('Paper 2', 'Conference B', '2022-02-02', 'Maria'),
  ('Paper 3', 'Conference C', '2022-03-03', 'Ali'),
  ('Paper 4', 'Conference D', '2022-04-04', 'Arthur'),
  ('Paper 5', 'Conference E', '2022-05-05', 'Simone'),
  ('Paper 6', 'Conference F', '2022-06-06', 'Tom'),
  ('Paper 7', 'Conference G', '2022-07-07', 'Lisa'),
  ('Paper 8', 'Conference H', '2022-08-08', 'John'),
  ('Paper 9', 'Conference I', '2022-09-09', 'Julia'),
  ('Paper 10', 'Conference J', '2022-10-10', 'Mike'),
  ('Paper 11', 'Conference K', '2022-11-11', 'Helen'),
  ('Paper 12', 'Conference L', '2022-12-12', 'Peter'),
  ('Paper 13', 'Conference M', '2023-01-13', 'Sophie'),
  ('Paper 14', 'Conference N', '2023-02-14', 'David'),
  ('Paper 15', 'Conference O', '2023-03-15', 'Emma')`;

  connection.query(insertResearchPapersData, (err, result) => {
    if (err) throw err;
    console.log('Authors data inserted');
  });
  


// Close the database connection
connection.end((error) => {
  if (error) throw error;
  console.log('Connection closed.');
});