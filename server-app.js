const express = require("express")
const app = express()
var mysql = require('mysql');
const bodyParser = require('body-parser')

var con = mysql.createConnection({
	host: "node-sql.ceqxw7fztytm.us-west-1.rds.amazonaws.com",
	user: "admin",
	password: "vamsiadmin",
	multipleStatements: true
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
con.connect(function (err) {
	if (err) throw err;
	console.log("Connected!");
	con.query("CREATE DATABASE IF NOT EXISTS Student; USE Student;", function (err, result) {
		if (err) throw err;
		console.log("Database created");
	});
	var ctable = "CREATE TABLE IF NOT EXISTS Persons (Personid INT NOT NULL AUTO_INCREMENT, Name VARCHAR(255), PRIMARY KEY (Personid));"
	con.query(ctable, function (err, result) {
		if (err) throw err;
		console.log("Table created");
	});
});

app.post('/insert', (req, res) => {
	con.query(`INSERT INTO Persons(Name) VALUES (${JSON.stringify(req.body.name)});`, function (err, result) {
		if (err) throw err;
		console.log("inserted")
		res.redirect(req.get('referer'))
	})
})

app.post('/delete', async (req, res) => {
	var sid = req.body.studentId
	con.query(`DELETE FROM Persons WHERE Personid = ${sid}`, function (err, data) {
		if (err) throw err;
		console.log("deleted")
		res.redirect(req.get('referer'))
	});
})

app.post('/slist', (req, res) => {
	con.query("SELECT * FROM Persons", function (err, data) {
		if (err) throw err;
		res.json(data)
	});
})

app.listen(8080, () => console.log("Listening ...."))