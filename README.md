# Final Project - Isaiah Easo
This is my final project for IT 338 where I will be creating a cryptocurrency watchlist app using Vue. 
Currently, the API uses a file system JSON file to pull six popular cryptocurrencies and add them to the watchlist table (i.e. the name, image, and symbol of the coin). A separate axios method pulls the current price of each cryptocurrency and its 24 hour percent change.

## Instructions for running the application
### Start the server
```
cd server
node index.js
```

### Start the Vue app
```
cd crypto-watchlist
npm run serve
```

## Part 1 (Due May 3rd)

- ~~Go to the Final project page and accept in.~~
- ~~Install Node.js and Vue Cli~~
- ~~Use vue-cli to create a final project folder and all the files.~~
- ~~Create a README.md file and write something about you project.~~
- ~~Follow the instructions from github to initialize a repo locally and to create a first commit.~~
- ~~Clean up the example code Vue Cli generate and create a component that makes sense for your app.~~

## Part 2 (Due May 10th) 

- ~~Create a new folder and call it Server (Or something similar). Depending how you structured your Final project, it can be a sibling or a child of the Vue app.~~
- ~~Use the examples shown in class to create a simple nodeJs and Express REST API for your app.~~
- ~~Do not forget to initialize a new npm project, (npm inti)~~
- ~~You API has to have a GET of one resource and a way to get them by some identifier. Note: one resource is not the count of items in your database, but the number of tables.~~
- ~~For your database you can use the file system (JSON file)~~, extra credit (2 points) will be awarded for using an actual database.
- ~~Fetch the data in Vue (App.vue) from your new api using ajax.~~
- ~~Create a component that will have the logic and the styles required for it.~~
- ~~Loop over each item in your array of objects and display it using the new component.~~
- ~~Update the README.md with how to start your server, requirements and the description of your API.~~

## Part 3 (Due May 17th)

- ~~Use the examples shown in class to add the router to your project.~~
- ~~You have to have create 2 routes, in your app and some sort of navigation.~~
- ~~At lease one has to be dynamic.~~
- ~~Extra credit (1 point): Add a visual module using npm, anything you want/need, slider, Rich Text Editor, video player~~
- ~~Before committing make sure your app doesn't have any compilation errors.~~