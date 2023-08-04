const express = require("express")
const axios = require("axios")
const app = express()
const apiServ = "http://localhost:8080"

app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
	var studs = await axios.post("http://localhost:8080/slist");
	res.render('index', { students: studs.data, apie: apiServ })
})

app.listen(8888, () => console.log("Listening ...."))
