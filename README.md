# Webbpack Express Example App

This application will assess if a newspost you enter in the form field is positive or negative. It will also give a confidence interval. This could be used in order to filter posts in a feed based on if you want to filter out only positive news. 

To assess if a post is positive or negative, please fill in an url in the form.

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

# How this code works

## handleSubmit
once an url is entered in the form, formHandler.js will fire out of the index.html. it will create an variable (formURL) and sent this to postData in the file dataPoster.js

## postData
in our dataPoster.js postData will wait here for the response. When able, it will fetch the url provided (in this case /sentiment) and post the data provided, which is then stringified.

## app.post
After this, the server in server/index.js will make a POST request to /sentiment, where it will send the data provided. and then run the sendData function

## sendData
the const url will be filled with the request data which was parsed out of body (the one we used stringefy on). Then there will be a call to the API through textapi.sentiment, and the url we requested will be filled there. Now, the text out of the formHandler will be filled in the api, and the api will do a sentiment scan on it. The response will be send in the function declared beneat textapi.sentiment.

## postData
back in our dataPoster.js, we will go to the try function that was awaiting the response of .json(). newData will now be filled with that response. Now we can fill every element on our website with information about this post and thus it will be visable for the user to see if the url they posted contains positive or negative text. 
