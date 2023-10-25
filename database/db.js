const mysql = require('mysql2');


//MySql
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'nautico1290',
    database:'laboratorio3'
});

const getConnection=()=>{
    return connection;
};

module.exports={getConnection};