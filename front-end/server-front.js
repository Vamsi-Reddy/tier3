require('dotenv').config();
const express = require("express")
const axios = require("axios")
const app = express()
const apiServ = process.env.API_SERVER;

app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
	try {
		var studs = await axios.post(`${apiServ}/slist`);
		res.render('index', { students: studs.data, apie: apiServ })
	} catch (err) {
		res.send(`some problem ${err}`);
	}

})

app.listen(process.env.FRONT_PORT, () => console.log("Listening ...."))