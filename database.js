const mysql= require('mysql')

var connection= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'testing'
})

connection.connect(function(error){
    if (error){
        throw error
    }else{
        console.log('MYSQL database is created Sucesfully')
    }
})
module.exports=connection;
