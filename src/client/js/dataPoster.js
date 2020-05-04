document.getElementById('generate').addEventListener('click', performAction);

export function performAction(e){
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

export const getLocation = async (baseURL, cityplace, key)=>{
    const res = await fetch(baseURL+cityplace+key)
    try {
        const data = await res.json();
        return data;
    } catch(error) {
        console.log("error", error);
        // appropriately handle the error
    }
};

export const getWeather = async (baseURL, cityplace, key)=>{
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
export const postData = async ( url='', data = {})=>{
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


export const updateUI = async () => {
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


