# Final Project - Isaiah Easo
## Overview
This is my final project for IT 338 where I will be creating a cryptocurrency watchlist app using Vue. 

![overview](https://i.ibb.co/3Cppk5T/crypto-watchlist-overview.gif)


A few highlights on what the application uses:
- [Coingecko API](https://www.coingecko.com/en/api) to request latest/historical information for cryptocurrencies
- [Express](https://www.npmjs.com/package/express) to run a simple JSON server
- [Axios](https://www.npmjs.com/package/axios) to perform GET/POST/DELETE requests to the JSON server
- [Vuex](https://www.npmjs.com/package/vuex) for centralized store and state-management
- [Canvas.js](https://www.npmjs.com/package/canvasjs) to create historical price charts
- [Video.js](https://www.npmjs.com/package/video.js?activeTab=readme) as modern video player on the About page

## Instructions for running the application locally
### Start the server
```
cd server
npm install
node index.js
```

### Start the Vue app
```
cd crypto-watchlist
npm install
npm run serve
```

## Instructions for accessing the application via the web
Visit https://crypto.easo.io/

## Using the app
This free-to-use crypto watchlist will help you track and learn more about virtually any cryptocurrency.

To use it, simply search for any cryptocurrency on the homepage, and if you would like to start tracking it, click "Add to watchlist." Removing a cryptocurrency from your watchlist is as easy as clicking the red delete button.
![watchlist](https://i.ibb.co/hHYh2Nf/Screen-Shot-2021-06-13-at-3-23-04-PM.png)

If you would like to learn more about any particular cryptocurrency from your watchlist, click on the coin name (i.e. Bitcoin).
![detail](https://i.ibb.co/bmd49MK/Screen-Shot-2021-06-13-at-3-24-51-PM.png)