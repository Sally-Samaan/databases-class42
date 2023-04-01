# Prep exercise week 1

As a preparation step for the upcoming Q&A, you will work through the following exercise. The expected result is a list of SQL `CREATE TABLE` statements representing the tables you will design.

We suggest you first think of the design of the tables (names, columns, types) and then proceed to write the SQL statements. That way, you're thinking about the problem you're trying to solve (creating a database that holds data) rather than the implementation first (creating a set of SQL statements).

## Exercise

Design the tables for a database that contains food recipes.

- Each recipe should have a name, one or more categories, a list of ingredients, and a list of steps to follow to complete the recipe.
- Many recipes might share the same ingredients or the same list of steps (For example, "cook pasta according to the package instructions" could be a regular step seen in multiple recipes).
- You can create your own data, focusing on Japanese, cake and vegetarian recipes. You can find some inspiration online, but keep it simple!

You don't need to write any specific queries now, but the design should consider that we will execute queries on the tables to extract data such as:

- You should be able to list all the recipes.
- You should be able to list recipes under a single category (Salads, Mexican, etc).

Some questions you can ask yourself:

- Which entities can you spot in the above problem ?
- Which tables do you need to create to store the above data?
- What are the relationships between those entities?

There's a [short video](https://www.youtube.com/watch?v=C3icLzBtg8I) explaining how relationships work, and you can use this for inspiration. We will expand this topic the following week.
////////////////////////

<!-- const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'meetup'

}); 

// Connect to the MySQL server
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL server');})

        // Drop the database if it exists
        connection.query('DROP DATABASE IF EXISTS meetup', (err, result) => {
            if (err) throw err;
            console.log('Database dropped');
          });
    // Create the database
    connection.query('CREATE DATABASE meetup', (err, result) => {
        if (err) throw err;
        console.log('Database created');
      });
  
      // Use the meetup database
      connection.query('USE meetup', (err, result) => {
        if (err) throw err;
        console.log('Database selected');
      });
  
    // Create the Invitee table
    const createInviteeTable = `CREATE TABLE Invitee (
      invitee_no INT PRIMARY KEY,
      invitee_name VARCHAR(255),
      invited_by VARCHAR(255)
    )`;
    connection.query(createInviteeTable, (err, result) => {
      if (err) throw err;
      console.log('Invitee table created');})

      
      // Insert data into the Invitee table
      const insertInviteeData = `INSERT INTO Invitee (invitee_no, invitee_name, invited_by)
        VALUES
        (1, 'Alice', 'Bob'),
        (2, 'Charlie', 'Marco'),
        (3, 'Dave', 'Eve'),
        (4, 'Eve', 'Charlie'),
        (5, 'Bob', 'Polo')`;
      connection.query(insertInviteeData, (err, result) => {
        if (err) throw err;
        console.log('Invitee data inserted');})
        
        // Create the Room table
        const createRoomTable = `CREATE TABLE Room (
          room_no INT PRIMARY KEY,
          room_name VARCHAR(255),
          floor_number INT
        )`;
        connection.query(createRoomTable, (err, result) => {
          if (err) throw err;
          console.log('Room table created');})
          
          // Insert data into the Room table
          const insertRoomData = `INSERT INTO Room (room_no, room_name, floor_number)
            VALUES
              (1, 'Room A', 3),
              (2, 'Room B', 4),
              (3, 'Room C', 5),
              (4, 'Room D', 2),
              (5, 'Room E', 1)`;
          connection.query(insertRoomData, (err, result) => {
            if (err) throw err;
            console.log('Room data inserted');})
            
            // Create the Meeting table
            const createMeetingTable = `CREATE TABLE Meeting (
              meeting_no INT PRIMARY KEY,
              meeting_title VARCHAR(50),
              starting_time DATETIME,
              ending_time DATETIME,
              room_no INT,
              FOREIGN KEY (room_no) REFERENCES Room(room_no)
            )`;
            connection.query(createMeetingTable, (err, result) => {
              if (err) throw err;
              console.log('Meeting table created');})

                 // Insert data into the Meeting table
            const insertMeetingData = `INSERT INTO Meeting (meeting_no, meeting_title, starting_time, ending_time, room_no)
            VALUES
            (1, 'Project a', '2023-03-25 09:00:00', '2023-03-25 11:00:00', 1),
            (2, 'Project b', '2023-04-01 15:00:00', '2023-04-01 17:00:00', 2),
            (3, 'Project c', '2023-04-15 10:00:00', '2023-04-15 12:00:00', 3),
            (4, 'Project d', '2023-04-22 14:00:00', '2023-04-22 16:00:00', 4),
            (5, 'Project e', '2023-04-29 11:00:00', '2023-04-29 13:00:00', 5);`;
              
            connection.query(insertMeetingData, (err, result) => {
                if (err) throw err;
                console.log('Meeting data inserted');})

    
  connection.end((error) => {
    if (error) throw error;
    console.log('Connection closed.');
  }); -->

DROP SCHEMA IF EXISTS `recipes`;
CREATE SCHEMA `recipes` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE `recipes`;

CREATE TABLE `RecipeItems` (
  `ItemID`       INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Type`         ENUM('Ingredient', 'Recipe'),
  `Name`         VARCHAR(255) NOT NULL,
  `Quantity`     FLOAT NOT NULL,
  PRIMARY KEY (`ItemID`),
  INDEX (`ItemID`, `Type`)
);

CREATE TABLE `Ingredients` (
  `IngredientID` INT UNSIGNED NOT NULL,
  `Type`         ENUM('Ingredient'),
  `CostPrice`    DECIMAL(6,2),
  PRIMARY KEY (`IngredientID`),
  FOREIGN KEY (`IngredientID`, `Type`) REFERENCES `RecipeItems` (`ItemID`, `Type`)
);

CREATE TABLE `Recipes` (
  `RecipeID`     INT UNSIGNED NOT NULL,
  `Type`         ENUM('Recipe'),
  `SellPrice`    DECIMAL(6,2),
  `Date`         DATE,
  `Instructions` TEXT,
  PRIMARY KEY (`RecipeID`),
  FOREIGN KEY (`RecipeID`, `Type`) REFERENCES `RecipeItems` (`ItemID`, `Type`)
);

CREATE TABLE `RecipeLineItems` (
  `RecipeID`     INT UNSIGNED NOT NULL,
  `ItemID`       INT UNSIGNED NOT NULL,
  `Quantity`     FLOAT NOT NULL,
  PRIMARY KEY (`RecipeID`, `ItemID`),
  FOREIGN KEY (`RecipeID`) REFERENCES `Recipes` (`RecipeID`),
  FOREIGN KEY (`ItemID`)   REFERENCES `RecipeItems` (`ItemID`)
);
