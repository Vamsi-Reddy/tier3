const express = require("express")
const app = express()
const mongoose = require('mongoose');

const mongodb = "mongodb://127.0.0.1:27017/School";
mongoose.connect(mongodb).then(() => console.log("Connected!")).catch((err) => console.log(err));

const studentSchema = new mongoose.Schema({
	name: String,
});
const Student = mongoose.model('Student', studentSchema);

app.get('/insert', (req, res) => {
	var stud = new Student({ name: req.query.name })
	stud.save()
	res.redirect('http://localhost:8888/')
})

app.get('/delete', async (req, res) => {
	var sid = req.query.studentId
	console.log(sid)
	await Student.deleteOne({ _id: sid })
	res.redirect('http://localhost:8888/')
})

app.get('/slist', async (req, res) => {
	var slist = await Student.find({})
	res.json(slist)
})

app.listen(8080, () => console.log("Listening ...."))