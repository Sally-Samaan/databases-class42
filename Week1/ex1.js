const mysql = require('mysql');

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
    
    // Create the Invitee table
    const createInviteeTable = `CREATE TABLE Invitee (
      invitee_no INT PRIMARY KEY,
      invitee_name VARCHAR(50),
      invited_by VARCHAR(50)
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
          room_name VARCHAR(50),
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
  });




