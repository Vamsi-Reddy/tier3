const express = require("express")
const axios = require("axios")
const app = express()

app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
	var studs = await axios.get("http://localhost:8080/slist");
	console.log(studs.data)
	res.render('index', { students: studs.data })
})

app.listen(8888, () => console.log("Listening ...."))
