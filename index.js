const express= require('express')
const app=express()
const connection = require("./database")
app.use(express.json())
//var bodyParser = require('body-parser')

// add the BodyParser
// app.use(bodyParser.urlencoded({extended:true}))
// app.use(bodyParser.json)

app.get('/', function (req, res) {
  res.send('Welcome!');
});
var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

//creating Database
app.get('/testing', (req, res) => {
  const createDatabase= "CREATE DATABASE testing"
  connection.query (createDatabase,
    (err)=>{
      if(err) throw err;
      console.log('Database Created Succesfully')
      res.send( "DB created")
  })
})


// routing table
app.get('/createTable', (req,res)=>{
  const createTable=  "CREATE TABLE IF NOT EXISTS users( id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, mobile BIGINT(10) NOT NULL)"
  connection.query (createTable, (err, results)=>{
      if(err) {
        res.status(500).send("Error Creating table")
      } else
      res.send('Table Created Succesfully')
  })
})

// insert table data
app.get ('/users', (req, res) => {
const insertData= "INSERT INTO users (name, email, mobile) VALUES ?"
const userData=[['abi','abi@gmail.com', '12345678'],['bala','bala@gmail.com', '23456789'],['dara', 'dara@gamail.com', '34567890']]
connection.query(insertData,[userData], (err, results) => {
  if(err) throw err;
  console.log("Data Inserted Sucessfully")
  res.send('Data Inserted Successfully')
})
})
// GET - read the data
app.get ('/get' , (req, res) => {
  connection.query('SELECT * FROM users', (err, results)=>{
    if (err) throw err;
    console.log("View Details:" , results )
    res.send(results)

  })
})
// POST create the data

app.post('/createpost', (req, res) => {
  var uname= req.body.name
  var uemail=req.body.email
  var umobile=req.body.mobile
  var sql="INSERT INTO users(name, email, mobile) values(?,?,?)"
  console.log("inserted page",sql)
  connection.query(sql, [uname, uemail, umobile] , (err, rows, fields)=> {
    if (err) {
      console.log("error", err)
      res.status(500).json({
        "Response Code":0,
        "ResposeMessage":"Error",
        "data":"Data Insertion failed"
      })
    } else {
      console.log("Data inserted successfully")
     res.json({
      "ResponseCode":1,
      "ResposeMessage":"success",
      "data": "Data Intserted Successfully"
    })
    }
  })
})

// PUT Update the data

app.put('/update/:id', (req, res)=>{
  const userId= req.params.id
  var uname=req.body.name
  var uemail=req.body.email
  var umobile=req.body.mobile
  var sql="UPDATE users SET name= ?,email= ?,mobile= ? WHERE id= ?"
  connection.query(sql, [uname, uemail, umobile, userId], (err, results)=>{
    console.log(sql)
    if (err) {
      console.error("Error Excecuting :", err)
      res.status(500).json({error:"error updating user"})
    } else if (results.affectedRows === 0) {
      res.status(404).json({error:"user not found"})
    } else {
      console.log(" Data Updated Successfully")
      res.json({messege:"user updated succesfully"})

    }
  })
 })

// DELETE delete the data
app.delete('/delete/:id', (req, res)=> {
  const userId= req.params.id
  var uname=req.body.name
  var uemail=req.body.email
  var umobile=req.body.mobile
  var sql= "DELETE FROM users WHERE id= ?"
  connection.query(sql, [userId], (err, results)=>{
    console.log(sql)
    if (err){
      console.error("Error Executing:", err)
      res.status(500).json({error:"Deleting User"})
    }else {
      res.json({messege:"User Deleted succesfully"})
    }
  })


})