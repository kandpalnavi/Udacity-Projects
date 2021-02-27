/* Global Variables */

// OpenWeatherMap  API Key
const API_KEY = "&APPID=41a793a4799b7d5bc367c1c0f90268de&units=imperial";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";

// Test if app.js is running
console.log("The app.js is running fine.");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Convert date
var convertDate = (timeStampVal) => {
	// Months array
	var months_array = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	
	// Convert timestamp to milliseconds
	var date = new Date(timeStampVal * 1000);
	
	// Year
	var year = date.getFullYear();
	
	// Month
	var month = months_array[date.getMonth()];
	
	// Day
	var day = date.getDate();
	
	// Weekday
	var d = new Date();
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	// get the name of the week as string and not number
	
	// Display date in Tuesday, 22 Oct '19 format
	var convertedTime = days[d.getDay()] + ", " + day + " " + month + " " + year;
	return convertedTime;
};

// Convert imperial Fahrenheit temperature - degree to Celsius
const  temperatureConverter = (fNum) => {
  fNum = parseFloat(fNum);
  return (fNum-32) / 1.8;
};

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", generateBtnAction);

// Function to get web API data using Async-await mechanism
const getDataApi = async (baseURL, zip, API_KEY) => {
  // ZIP code taken as an example of Indian cities. Eg: 201301, 263139
	if (zip.toString().length !== 6) {
		alert("Please enter a 6 digit zip code!");
	} 
	else {
		const url = `${baseURL}${zip}${API_KEY}`;
		const request = await fetch(url);
		
		try {
			// Transform into JSON
			const allData = await request.json();
			if (allData.message) {
				alert(allData.message);
			} 
			else {
				return allData;
			}
		} 
		catch (error) {
			console.log("API data error!", error);
			// appropriately handle the error
		}
	}
};

// Function to post data using Async-await mechanism
const postDataApi = async (url = "", data = {}) => {
	console.log("post weather data: ", data);
	const response = await fetch(url, {
		method: "POST",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data), // body data type must match "Content-Type" header
	});

	try {
		const newData = await response.json();
		console.log("post res: ", newData);
	} 
	catch (error) {
		console.log("Error while posting the data in the weather API!", error);
	}
};

// Function to get project data and update the dynamic HTML
const updateUI = async () => {
	const request = await fetch("/all");
	try {
		const data = await request.json();
		console.log("updateUI: ", data);
		document.getElementById("date").innerHTML = `${data.date}`;
		document.getElementById("date2").innerHTML = data.date;
		document.getElementById("temp").innerHTML = temperatureConverter(data.temperature).toFixed(2)+`°C`;
		document.getElementById("tempData").innerHTML = temperatureConverter(data.temperature).toFixed(2)+`°C`;
		document.getElementById("content").innerHTML = data.userResponse;
		document.getElementById("cityName").innerHTML = data.city;
	} 
	catch (error) {
		console.log("error", error);
	}
};


// Function called by event listener
function generateBtnAction() {
	const zip = document.getElementById("zip").value;
	const feelings = document.getElementById("feelings").value;

	getDataApi(baseURL, zip, API_KEY).then(function (data) {
		// Add data
		console.log("All data from API: ", data);
		
		// Check if the data is correctly supplied
		if( typeof data != "undefined")
		{
			postDataApi("/addWeatherData", {
  				temperature: data.main.temp,
  				date: convertDate(data.dt),
  				city: data.name,
  				userResponse: feelings,
  			});
		}
	})
	.then(() => {
		console.log("Hey! I am here.")
		updateUI();
	});
}