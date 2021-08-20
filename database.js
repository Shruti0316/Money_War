const mysql = require("mysql2");

//CONNECTING WITH DATABASE MYSQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'username',
    password: '',
    database: 'money_war'
})
//Checking if connection is established or not
db.connect(function(err){
    if(!err){
        console.log("Sucessfully Connected");
    }
    else{
        console.log("NOt Connected");
    }
})
module.exports = db;