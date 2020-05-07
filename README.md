# Webbpack Express Example App

This application will assess if I used all elements of my previous courses to finish the capstone of the javascript programming course.

To make a travel entry, please fill in the form with a zip code, country and date of when you will leave. 

## How to start

Fork this repo, then clone your forked repo down to your computer:

```
git clone -- git@github.com:[your-user-name]/webpack-express.git --
```

`cd` into your new folder and run:
- ```npm install```
- ```npm i webpack webpack-cli```
- ```npm i -D @babel/core @babel/preset-env babel-loader```
- ```npm i -D @babel/core @babel/preset-env babel-loader```
- ```npm i -D html-webpack-plugin```
- ```npm i -D clean-webpack-plugin```
- ```npm i -D webpack-dev-server```
- ```npm i -D style-loader node-sass css-loader sass-loader```
- ```npm install workbox-webpack-plugin --save-dev ```
- ```npm i dotenv```
- ```npm install aylien_textapi```
- ```npm start``` to start the app
- this app runs on localhost:3000, but you can of course edit that in server.js

open 2 terminals, 1 for the server out of server/index.js and one for the webpack build modes. in order to run a build mode either go for the development mode by entering 

npm run build-dev

or the production mode through

npm run build-prod

in the other terminal, run the server side (again, server/index.js) by running

npm run start
[OR]
npm start

## How this code works

### performAction (dataPoster.js)
once all data is filled in the form in the index.thml, and the submit button is clicked, performAction in Dataposter.js will fire. It wil get all the date filled in the form and request the data of the first api geonames which will be used by the function getLocation 

### getLocation (dataPoster.js)
getLocation will be fired and used pre filled data together with the form data to request connection with the api. It will wait for a response and send this data back to the function. with this data, performAction will continue to fill variables of longitute latitude and a placename. the latter will be used to request an image of the placename, if this exists.

### getPicture (dataPoster.js)
getPicture will be fired and will use the placename to look for an image of the place that corresponded with the entered zip code. It will wait for a response and send this data back to the function. If it can't find a picture, an pre-set picture will be used.

### getWeather (dataPoster.js)
getWeather will be fired and will use the langitude and longitude of getLocation to find correct weather data. It will wait for a response and send this data back to the function. It will also use the entered date to calculate how many day there are between the entered date and current days, and will use this (Difference_In_Days) to get the right array entry from the data. here all the variables will be declared. If there is more than 16 days in between the current and entered date, it will give empty strings for weather forecast (since the API can only look 16 days ahead). Another part of this if function is the switch states. These are used to find a corresponding icon for the weather, matching to a weather code provided by the API, with icons from the own server (for aesthetic reasons). The codes and corresponding forecast and icon can be found on https://www.weatherbit.io/api/codes, icons are based on these icons. After the if function all the variables will be used in the function postData

### postData (dataPoster.js) > (server.js)
In our dataPoster.js, we will go try to make a post request when it fetches the url given to postData

### app.post (server.js)
After this, the server in server/index.js will make a POST request to /addCity, where it will send the data provided to projectData. newEntry will now be filled with that response. Now we can fill every element on our website with information about this post. 

### updateUI (dataPoster.js)
After this, UpdateUI will request information from the /all source. when data is provided, it will start filling all the relevant div's with provided by the performAction function (see getPicture), and will show the Entryholder div, which also holds a button that will allow us to enter new data (see PerformUpdate). In the updateUI there is also an if function that checks if weather data is filled (by checking the temperature), if this is not the case, it won't display anything concerning the weather on top of the image. If there is information provided, it will show. 

### performUpdate (dataPoster.js)
once performAction is finished, a div will appear with another orange button and a text field. this text allows you to enter new data concerning what you want to do at entered location with the weather provided (if any). If an entry is filled, you can enter the button and it will run the function updatePlans. 

### updatePlans (dataPoster.js) > (server.js)
In our dataPoster.js, we will go to the try function that was awaiting the response of .json(). allData will now be filled with that response. It will get all values and send them again with post data to /addPlan, and add the variable plans with it as well. 

### app.get (server.js) 
on the server side, when requestion for the /all data, it will use sendData

### sendData (server.js) 
All entries from projectData will be send to /all

### postData (dataPoster.js) > (server.js)
In our dataPoster.js, we will go try to make a post request when it fetches the url given to postData

### app.post (server.js)
After this, the server in server/index.js will make a POST request to /addPlan, where it will send the data provided to projectData, but also to totalData, which is our storer for all the complete data. projectData is just there for the single requests. All entries from projectdata will be deleted and the new information will be used to fill totalData.

### updatePlansUI (dataPoster.js)
UpdatePlansUI will make a request to fetch all data from /all

### app.get (server.js) 
on the server side, when requestion for the /all data, it will use sendData

### sendData (server.js) 
All entries from projectData will be send to /all

### updatePlansUI (dataPoster.js)
updateplans will then file all received data in allData, where it will make the last style changes and complete the data. and a full entry of of travel plans have now been made!

# Extend your Project/Ways to Stand Out

## Which elements did I use to stand out?

The extra elements I used for standing out were:
- Allow the user to add a todo list and/or packing list for their trip.
- Incorporate icons into forecast.

