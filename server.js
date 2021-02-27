// Setup empty JS object to act as endpoint for all routes
var  projectData = {};

// Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require("body-parser");

/* Middleware*/

// Here we are configuring express to use body-parser as middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Spin up the server
const port = 9999;

// Callback to debug
var listening = () => {
  console.log("server running");
	console.log(`running on localhost:${port}`);
};
const server = app.listen(port, listening);

// Initialize all route with a callback function
app.get("/all", function(reqObj, respObj){
  // RETURN the response from the callback
  respObj.send(projectData);
});

// POST route with a callback
app.post("/addWeatherData", function(reqObj, respObj) {
	projectData = reqObj.body;
  // RETURN the response from the callback
	respObj.send(projectData);
});
