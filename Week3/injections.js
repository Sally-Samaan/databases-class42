// If we enter name and code arguments like this --> '' OR '1'  we can get all population information
// The query will be like this:
// SELECT Population FROM ${Country} WHERE Name = '' OR '1'='1' and code = '' OR '1'='1'

// We can fix this function like this:

function getPopulation(Country, name, code, cb) {
    conn.query(
      'SELECT Population FROM ?? WHERE Name = ? AND code = ?',
      [Country, name, code],
      function (err, result) {
        if (err) return cb(err);
        if (result.length == 0) return cb(new Error('Not found'));
        cb(null, result[0].Population);
      }
    );
  }