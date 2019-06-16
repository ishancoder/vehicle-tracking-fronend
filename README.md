This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Vehicle Tracking DASHBOARD

## Motivation

This Project is made in order to complete a programming challenge. The motive for this is to create a web application which can show a company's vehicle data in real time on a DashBoard. This is the FRONTEND part of the application. You can find the companion backend for the DASBOARD [here](https://github.com/ishancoder/vehicle-tracking-backend).


## Assumptions (FRONTEND)
1. A vehicle can be in one of the three state **MOVING**, **STOPPED** and **OFFLINE**.
2. A vehicle is considered moving if it's sending data to the backend in at most 10 seconds and it's Longitude and/or Latitude is changing.
3. A vehicle is considered to be stopped in either of these two case.
    1. If the vehicle is sending the data to the server in atmost 10 seconds but the Latitude and/or Longitude remains same.
    2. If the vehicle has not sent any information to the server in an interval of 10-60 seconds.
4. A vehicle is considered offline if it has not sent any information to the server for more that 60 seconds.

## Visual Represntation
1. You'll see one card for each vehicle registered with backend.
2. The card will show the information like Type (With and Icon), Unique Identifier, Latitude (Lat.), Longitude (Long.), Speed and Last Updated Time (12 Hours Format).
3. If the vehicle is **MOVING** the background of the card is going to be **GREEN** with **WHITE** text on it.
4. If the vehicle is **STOPPED** the background of the card is going to be **RED** with **WHITE** text on it.
5. If the vehicle is **OFFLINE** the background of the card is going to be **LIGHT GRAY** with **BLACK** text on it.

## Technologies Used
1. `React` since it really smart updating the UI so we don't have to deal with performance issues while updating the state with new changes.
2. `SASS` Syntactically Awesome and makes CSS more readable and maintainable.
3. `Socket.io` for getting data from WebSockets.
3. `create-react-app` to Bootstrap the application.

## How to get this thing Running Locally.

Follow these simple steps.

1. `git clone` or download the repository.
2. `cd` into the directory.
3. Run `npm install` or `yarn` (if you're using it).
4. Let the dependencies download.
5. Run `npm start` or `yarn start`.
6. A browser window will Automatically open but if it didn't visit [http://localhost:3000](http://localhost:3000). 
