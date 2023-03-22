const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'new_world'

}); 

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database');
      throw err;
    }
    console.log('Connected to MySQL database');
    ///more than 8000000
  
    const countries = `SELECT Name FROM country WHERE Population > 8000000`;

    connection.query(countries, (error, results) => {
      if (error) throw error;
      console.log('The names of countries with population greater than 8 million are:');
      results.forEach((result) => {
        console.log(result.Name);
      });
    });

/// with land i  the name 
    const land = `SELECT Name FROM country WHERE Name LIKE '%land%'`;

    connection.query(land, (error, results) => {
        if (error) throw error;
        console.log('The names of countries that have “land” in their names');
        results.forEach((result) => {
          console.log(result.Name);
        });
      });

      //Cities population 500000 to 1 million 
      const cities = `SELECT Name FROM city WHERE Population BETWEEN '500000' AND '1000000'`;

      connection.query(cities, (error, results) => {
        if (error) throw error;
        console.log('The names of city with population in range of half a million to 1 million');
        results.forEach((result) => {
          console.log(result.Name);
        });
      });

      ///countries in europe

      const continent = `SELECT Name FROM country WHERE Continent = 'Europe'`;

      connection.query(continent, (error, results) => {
          if (error) throw error;
          console.log('The names of countries on the continent ‘Europe’');
          results.forEach((result) => {
            console.log(result.Name);
          });
        });

// descending order of surface areas

   const surface = `SELECT Name FROM country ORDER BY SurfaceArea DESC`;

      connection.query(surface, (error, results) => {
          if (error) throw error;
          console.log('The names of countries in descending order of their surface areas');
          results.forEach((result) => {
            console.log(result.Name);
          });
        });


// Netherlands cities 
    const inNetherlands = `SELECT Name FROM city WHERE CountryCode = 'NLD'`;

    connection.query(inNetherlands, (error, results) => {
        if (error) throw error;
        console.log('The names of all the cities in the Netherlands');
        results.forEach((result) => {
          console.log(result.Name);
        });
      });

// Rotterdam population 
const rotterdam = `SELECT Population FROM city WHERE ID = 6`;

connection.query(rotterdam, (error, results) => {
  if (error) throw error;
  console.log('The population of Rotterdam');
  results.forEach((result) => {
    console.log(result.Population);
  });
});

// top 10 countries by Surface Area

const topSurface = `SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10`;

connection.query(topSurface, (error, results) => {
    if (error) throw error;
    console.log('The names of countries that are the top 10 countries by Surface Area');
    results.forEach((result) => {
      console.log(result.Name);
    });
  });


//top 10 most populated cities  
const topPopulated = `SELECT Name FROM city ORDER BY Population DESC LIMIT 10`;

connection.query(topPopulated, (error, results) => {
    if (error) throw error;
    console.log('The names of Cities that are the top 10 most populated cities');
    results.forEach((result) => {
      console.log(result.Name);
    });
  });

//population number of the world
const worldPopulation = `SELECT SUM(Population) AS population_sum FROM country`;

connection.query(worldPopulation, (error, results) => {
    if (error) throw error;
    console.log('the population number of the world');
    console.log(results[0].population_sum);
});

    connection.end((err) => {
      if (err) {
        console.error('Error closing MySQL database connection');
        throw err;
      }
      console.log('Closed MySQL database connection');
    });
  });
    