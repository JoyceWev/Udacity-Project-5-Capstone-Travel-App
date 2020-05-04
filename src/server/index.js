const dotenv = require('dotenv')
dotenv.config()

var path = require('path')
const express = require('express')

// Setup empty JS object to act as endpoint for all routes
const projectData = [];

/* Dependecies*/
// Require Bodyparser to run server and routes
const bodyParser = require('body-parser');
// Require Express to run server and routes

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder

app.use(express.static('dist'))

console.log(__dirname);

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// Setup Server
const port = 8080;
const server = app.listen(port,listening);

function listening() {
	//console.log(server);
	console.log("server is running i guess");
    console.log("oh and btw, the port is " + port);
}

app.get('/all', sendData);

// POST method route

function sendData (req, res) {
	res.send(projectData);
};

function receivedPost (req, res) {
	console.log(res);
	res.send('POST received')
};

app.post('/addCity', addWeather);

function addWeather (req, res) {
	console.log(req);
	let newEntry = {
		city: req.body.city,
		temp: req.body.temp,
		lat: req.body.lat,
		long: req.body.long,
		plans: req.body.plans,
		traveldate: req.body.traveldate,
		max_temp: req.body.max_temp,
        min_temp: req.body.min_temp,
        rain: req.body.rain,
        weather_description: req.body.weather_description,
        weather_code: req.body.weather_code
	}
	projectData.unshift(newEntry);
	console.log(newEntry);
	res.send(projectData);
}