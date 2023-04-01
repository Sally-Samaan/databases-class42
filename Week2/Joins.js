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



const firstJoin = `SELECT a.author_name, m.mentor_name
                  FROM authors AS a
                  INNER JOIN mentors AS m ON a.mentor_id = m.mentor_id`;
                  
  connection.query(firstJoin, (err, results) => {
    if (err) throw err;
    console.log('firstJoin results:', results);
  });
  
  const secondJoin = `SELECT a.*, rp.paper_title
                  FROM authors AS a
                  LEFT JOIN authorship AS au ON a.author_id = au.author_id
                  LEFT JOIN research_Papers AS rp ON au.paper_id = rp.paper_id`;
                  
  connection.query(secondJoin, (err, results) => {
    if (err) throw err;
    console.log('secondJoin results:', results);
  });

  connection.end((err) => {
    if (err) throw err;
    console.log('Connection closed');
  });