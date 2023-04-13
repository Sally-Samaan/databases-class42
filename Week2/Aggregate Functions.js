const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "university",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected");
});


// //All research papers and the number of authors that wrote that paper
// const authorsNumber =
//   "SELECT research_authors.paper_id, count(research_authors.author_id) AS authors FROM research_authors GROUP BY paper_id";
// db.query(authorsNumber, (err, result) => {
//   if (err) throw err;
//   console.log(
//     "All research papers and the number of authors that wrote that paper",
//     result
//   );
// });

//Sum of the research papers published by all female authors
const authorsNumber =
  "SELECT count(research_papers.paper_title) AS female_papers FROM research_papers JOIN authors ON research_papers.paper_id = authors.author_id WHERE authors.gender = 'female' GROUP BY authors.gender";
db.query(authorsNumber, (err, result) => {
  if (err) throw err;
  console.log(
    "Sum of the research papers published by all female authors",
    result
  );
});