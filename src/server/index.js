const dotenv = require('dotenv')
dotenv.config()

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

var AYLIENTextAPI = require('aylien_textapi');
var textapi = new AYLIENTextAPI({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});
// Setup empty JS object to act as endpoint for all routes

app.use(express.static('dist'))

console.log(__dirname);

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
const port = 8080;
app.listen(port, function () {
    console.log('Example app listening on port '+port)
})

// POST method route
 app.post('/sentiment', sendData);
 function sendData (req, res) {
 	console.log(req);
 	const url = req.body.URL
 	console.log(url);
 	textapi.sentiment({
		url: url,
		mode: 'document' 
	},
	function(error, response) {
		if (error) {
			console.log(error)
		} else{
			res.send(response)
		}
	})
 };


