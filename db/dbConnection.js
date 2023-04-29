const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost' ,
  user     : 'root',
  password : '',
  database : 'db',
  port: "3306", //Default 
}); 
connection.connect((err) =>{
    if (err) {
      console.error(`Database ERROR: ${err}`);
      return;
    }
    console.log("Connected to MYSQL Ya Eman");
  });
module.exports = connection


