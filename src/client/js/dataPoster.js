document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('generate').addEventListener('click', performAction);
  document.getElementById('add').addEventListener('click', performUpdate);
});

export function performAction(e){
  // Get here the values that are entered manually by the user
  let travelDate = document.getElementById('inputdate').value;
  const country = document.getElementById('country').value;

  //values for geolocation
  let baseURLplace = 'http://api.geonames.org/postalCodeSearchJSON?postalcode='
  const zip = document.getElementById('zip').value;
  const apiKeyGeo = '&maxRows=1&username=joycewev'
  const adresComplete = zip + "&country=" + country;

  //values for weather API
  let baseURLweather = "https://api.weatherbit.io/v2.0/forecast/daily?"
  let apiKeyWeather = "&key=d41f1f76ea4d40358d57f99948e44988"

  //values for the icture API
  let baseURLpicture = "https://pixabay.com/api/?key="
  let apiKeyPic = "16358853-5d3238f52bb8320a3cae49b61"
  let query = "&q="
  let imagetype = "&image_type=photo&orientation=horizontal&category=places+nature&safesearch=true&per_page=3"

  document.getElementById('travelplans').style.display = "block";
  document.getElementById('content').style.display = "none";

  //first get the location
    getLocation(baseURLplace,adresComplete,apiKeyGeo)
    .then(function(data){
        //controll if right data is returned
        if(data.postalCodes[0] === undefined){
          alert("Sorry, the postal code or country is not valid")
        }

        let lat = data.postalCodes[0].lat;
        let long = data.postalCodes[0].lng;
        let location = data.postalCodes[0].placeName;
        let locations = "lat=" + lat + "&lon=" + long;

        //when the right info (place, latitude and longitude) is retreived, let the API retreive an image
        getPicture(baseURLpicture,apiKeyPic,query,location,imagetype)
        .then(function(pictureData){
          //if there can't be an image found of the entered location, fill in a standard picture
          let placePicture;
          if (pictureData.hits[0] === undefined){
            placePicture = "/09724a3b9e0fdea29d1104c785fc2767.jpg";
          } else{
            placePicture = pictureData.hits[0].largeImageURL;
          }

          //get the weather for the entered location by entering the latitude and longitude
          getWeather(baseURLweather,locations,apiKeyWeather)
          .then(function(weatherData){
              // Create a new date instance dynamically with JS for current date and the date input, then calculate the difference in days
              let date = travelDate;
              let dateParts = date.split("-");
              var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
              let Difference_In_Days = -1;
              if(dateParts[0]>31 || dateParts[1] > 12){
                alert("Sorry, the entered date is not in the right format of DD-MM-YYYY")
              } else{
                let inputDate = new Date(dateObject.toUTCString());
                let currentDate = new Date();
                let Difference_In_Time = inputDate.getTime() - currentDate.getTime();
                Difference_In_Days = Math.ceil(Difference_In_Time / (1000 * 3600 * 24));  
              }

              // To calculate the no. of days between two dates round 
              if(Number(Difference_In_Days) < -0 && (dateParts[0]>31 || dateParts[1] > 12)){
                
              } else if(Number(Difference_In_Days)) {
                alert("Sorry, you can make a travel planning, but you can't travel in the past!")
              }else if(isNaN(Difference_In_Days) || !travelDate.includes("-")){
                alert("Sorry, the entered date is not in the right format of DD-MM-YYYY")
              }

              // store all relevant weather data in variables, use the Difference_In_Days variable for accessing the right date from the data
              let weather_code = "";
              let temp = "";
              let max_temp = "";
              let min_temp = "";
              let rain = "";
              let weather_description = "";
              let icon = ""

              console.log(Difference_In_Days);
              console.log(Difference_In_Days > 16)
              if(Difference_In_Days > 16){
                weather_code = "";
              } else{
                temp = weatherData.data[Difference_In_Days].temp;
                max_temp = weatherData.data[Difference_In_Days].max_temp;
                min_temp = weatherData.data[Difference_In_Days].min_temp;
                rain = weatherData.data[Difference_In_Days].precip;
                weather_description = weatherData.data[Difference_In_Days].weather.description;
                weather_code = weatherData.data[Difference_In_Days].weather.code;     

                  //use a cases to match the icon to each weather code
                switch(weatherData.data[Difference_In_Days].weather.code){
                   case 200: case 201: case 202: case 230: case 231: case 232: case 233:
                     // thunderstorm
                     icon = "c0f530c4bb027b3aa2035fe19f4b6ad5.png"
                     break;
                   case 300: case 301: case 302: 
                     // drizzle
                     icon = "ee178093d9b8e61d079e7570c3eab232.png"
                     break;
                   case 500: case 501: case 502: case 511: case 520: case 521: case 522:
                     // rain
                     icon = "07ab279062f1e78c45d4e3fe1acb49c8.png"
                     break;
                   case 600: case 601: case 602: case 610: case 621: case 622: case 623:
                     // snow
                     icon = "85c920ac67215639276f759cb38f599b.png"
                     break;
                   case 611: case 612:
                     // wind/sleet
                     icon = "4f60dc7897e977843cdbdd7df18222ce.png"
                     break;
                   case 700: case 711: case 721: case 731: case 741: case 751: 
                     // mist
                     icon = "f4a0ea5dfe4c0fb14f1bf701122a534c.png"
                     break;
                   case 800:
                     // clear
                      icon = "bd0ee248d440fb88cf36d661c1936ac3.png"
                     break;
                  case 801: case 802: case 803:
                     // bit of clouds
                      icon = "05d74172fc65a1d01626c0e1ee0d9c96.png"
                     break;
                   case 804:
                     // overcast
                      icon = "3a4650e6255fd139b921926988c91da2.png"
                     break;
                   case 900: default:
                    // unknown/default
                      icon = "3a4650e6255fd139b921926988c91da2.png"
                    break;
                }       
              }

              document.getElementById('icon').src = icon

              //post the data through index.js by posting it to addcity
              postData('/addCity', {
                city:data.postalCodes[0].placeName, 
                lat:data.postalCodes[0].lat, 
                long:data.postalCodes[0].lng, 
                traveldate:travelDate, 
                temp:temp,
                max_temp:max_temp,
                min_temp:min_temp,
                rain:rain,
                weather_description:weather_description,
                weather_code:weather_code,
                placePicture:placePicture
              });

              //finally, update (part of) the UI with all retreived information
              updateUI();
          });
        })
  })
};

export function performUpdate(e){
    updatePlans()
    .then(function(){
       updatePlansUI();
    })
  };
  


export const getPicture = async (baseURL,apiKey,query,location,imagetype)=>{
    const res = await fetch(baseURL+apiKey+query+location+imagetype)
    try {
        const data = await res.json();
        return data;
    } catch(error) {
        console.log("error", error);
        // appropriately handle the error
    }
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
    const allData = await request.json();
    console.log(allData);

    //fill all elements according to ID in HTML with requested values, or change their characteristics
    document.getElementById('entryHolder').style.display = "flex";
    document.getElementById('placeImageHolder').src = allData[0].placePicture;
    document.getElementById('date').innerHTML = 'Date: ' + allData[0].traveldate;
    
    document.getElementById('city').innerHTML = allData[0].city;
    
    console.log(Object.entries(allData[0].weather.temp).length === 0 && allData[0].weather.temp.constructor === Object)

    //check if returned data is empty and is an object
    if(allData[0].weather.temp === "" ){
      document.getElementById('informationHolder').style.display = "none"
    }else{
      document.getElementById('informationHolder').style.display = "flex"
      document.getElementById('temp').innerHTML = allData[0].weather.temp;
      document.getElementById('degrees').innerHTML = "°C";
      document.getElementById('max_temp').innerHTML = allData[0].weather.max_temp + "°C";
      document.getElementById('min_temp').innerHTML = allData[0].weather.min_temp + "°C";
      document.getElementById('rain').innerHTML = allData[0].weather.rain.toFixed(1);
      document.getElementById('weather_description').innerHTML = allData[0].weather.weather_description;
    }


  }catch(error){
    console.log("error", error);
  }
};

export const updatePlans = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    console.log(allData);

    //enter a part here where the UI can be updated again with the entered content
      let plans = document.getElementById('feelings').value;
      postData('/addPlan', {
                city:allData[0].city, 
                lat:allData[0].lat, 
                long:allData[0].long, 
                plans:plans,
                traveldate:allData[0].traveldate, 
                temp:allData[0].weather.temp,
                max_temp:allData[0].weather.max_temp,
                min_temp:allData[0].weather.min_temp,
                rain:allData[0].weather.rain,
                weather_description:allData[0].weather.weather_description,
                weather_code:allData[0].weather.weather_code,
                placePicture:allData[0].placePicture
              });
     

  }catch(error){
    console.log("error", error);
  }
};

export const updatePlansUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    console.log(allData);
       document.getElementById('travelplans').style.display = "none";
        document.getElementById('content').style.display = "block";
       document.getElementById('content').innerHTML = "\"" + allData[0].plans + "\"";
       document.getElementById('feelings').value = "";
  }catch(error){
    console.log("error", error);
  }
};





