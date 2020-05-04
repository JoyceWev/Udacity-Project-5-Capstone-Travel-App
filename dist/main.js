var Client =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "performAction", function() { return /* reexport */ performAction; });
__webpack_require__.d(__webpack_exports__, "getLocation", function() { return /* reexport */ getLocation; });
__webpack_require__.d(__webpack_exports__, "getWeather", function() { return /* reexport */ getWeather; });
__webpack_require__.d(__webpack_exports__, "postData", function() { return /* reexport */ postData; });
__webpack_require__.d(__webpack_exports__, "updateUI", function() { return /* reexport */ updateUI; });

// CONCATENATED MODULE: ./src/client/js/dataPoster.js
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
  //values for geolocation
  let baseURLplace = 'http://api.geonames.org/postalCodeSearchJSON?postalcode='
  const country = document.getElementById('country').value;
  const zip = document.getElementById('zip').value;
  const apiKeyGeo = '&maxRows=1&username=joycewev'
  const adresComplete = zip + "&country=" + country;
  let plans = document.getElementById('feelings').value;
  let travelDate = document.getElementById('inputdate').value;
  let APIRequest = baseURLplace + adresComplete + apiKeyGeo;
  //values for weather API, perhaps include an if function if we want to request different weather
  //to request the days we must let the user enter the number in the array, so get that number from the array or a calculation. 
  let baseURLweather = "https://api.weatherbit.io/v2.0/forecast/daily?"
  let apiKeyWeather = "&key=d41f1f76ea4d40358d57f99948e44988"
  console.log(APIRequest);
    getLocation(baseURLplace,adresComplete,apiKeyGeo)
    .then(function(data){
        console.log(data);
        let lat = data.postalCodes[0].lat;
        let long = data.postalCodes[0].lng;
        let locations = "lat=" + lat + "&lon=" + long;
        console.log(baseURLweather+locations+apiKeyWeather)
        getWeather(baseURLweather,locations,apiKeyWeather)
        .then(function(weatherData){
            console.log(weatherData);
            // Create a new date instance dynamically with JS
            let date = travelDate;
            let dt = new Date(date + "z")
            let dtUpdate = new Date(dt.toLocaleDateString('en-GB') + "z");
            let inputDate = new Date(dtUpdate.toUTCString());
            let currentDate = new Date();

            let Difference_In_Time = inputDate.getTime() - currentDate.getTime(); 
          
            // To calculate the no. of days between two dates round 
            let Difference_In_Days = Math.ceil(Difference_In_Time / (1000 * 3600 * 24)); 

            let temp = weatherData.data[Difference_In_Days].temp;
            let max_temp = weatherData.data[Difference_In_Days].max_temp;
            let min_temp = weatherData.data[Difference_In_Days].min_temp;
            let rain = weatherData.data[Difference_In_Days].precip;
            let weather_description = weatherData.data[Difference_In_Days].weather.description;
            let weather_code = weatherData.data[Difference_In_Days].weather.code;
            console.log(temp);
              
            //To display the final no. of days (result) 
            console.log(Difference_In_Days);
            postData('/addCity', {
              city:data.postalCodes[0].placeName, 
              lat:data.postalCodes[0].lat, 
              long:data.postalCodes[0].lng, 
              plans:plans, 
              traveldate:travelDate, 
              temp:temp,
              max_temp:max_temp,
              min_temp:min_temp,
              rain:rain,
              weather_description:weather_description,
              weather_code:weather_code
            });
            updateUI();
        })
  });
};

const getLocation = async (baseURL, cityplace, key)=>{
    const res = await fetch(baseURL+cityplace+key)
    try {
        const data = await res.json();
        return data;
    } catch(error) {
        console.log("error", error);
        // appropriately handle the error
    }
};

const getWeather = async (baseURL, cityplace, key)=>{
    const res = await fetch(baseURL+cityplace+key)
    try {
        const data = await res.json();
        return data;
    } catch(error) {
        console.log("error", error);
        // appropriately handle the error
    }
};

//Global Variables 
const postData = async ( url='', data = {})=>{
    const res = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data), 
    });

    try {
        const newData = await res.json();
        return newData;
    } catch(error) {
        console.log("error", error);
      // appropriately handle the error
    }
};


const updateUI = async () => {
  const request = await fetch('/all');
  try{
    //document.getElementById('entryHolder').style.backgroundColor = "#FFF";
    const allData = await request.json();

    // Create a new date instance dynamically with JS
    let date = allData[0].traveldate;

    //let options = { weekday: 'long'};
    //let newDate = new Intl.DateTimeFormat('en-US', options).format(date)+' '+ date.getDate() +'.'+ date.getMonth() +'.'+ date.getFullYear();
    console.log(date);

    document.getElementById('date').innerHTML = 'Date: ' + allData[0].traveldate;
    document.getElementById('temp').innerHTML = allData[0].temp;
    document.getElementById('city').innerHTML = allData[0].city;
    document.getElementById('content').innerHTML = "\"" + allData[0].plans + "\"";
    document.getElementById('max_temp').innerHTML = allData[0].max_temp + "°C";
    document.getElementById('min_temp').innerHTML = allData[0].min_temp + "°C";
    document.getElementById('rain').innerHTML = allData[0].rain;
    document.getElementById('weather_description').innerHTML = allData[0].weather_description;
    console.log(allData);

  }catch(error){
    console.log("error", error);
  }
};



// EXTERNAL MODULE: ./src/client/styles/resets.scss
var resets = __webpack_require__(0);

// EXTERNAL MODULE: ./src/client/styles/base.scss
var base = __webpack_require__(1);

// EXTERNAL MODULE: ./src/client/styles/footer.scss
var footer = __webpack_require__(2);

// EXTERNAL MODULE: ./src/client/styles/form.scss
var styles_form = __webpack_require__(3);

// EXTERNAL MODULE: ./src/client/styles/header.scss
var header = __webpack_require__(4);

// CONCATENATED MODULE: ./src/client/img/tnc_16935516.jpg
/* harmony default export */ var tnc_16935516 = (__webpack_require__.p + "4f6bdd6f3f5c18b2aba7765e6700fb8a.jpg");
// CONCATENATED MODULE: ./src/client/index.js















/***/ })
/******/ ]);