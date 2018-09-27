// Imports express into our app and sets it up for use
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

// Defines a PORT for the server to listen for requests
const PORT = process.env.PORT || 3000;

// Sets up our server to parse our request body for usage
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sets our server to use the public directory for static assets
app.use(express.static(path.join(__dirname, 'public')));

// Connect to the Mongo DB using the inventorymaster database (will be created if it doesn't exist)
mongoose.connect('mongodb://user:password1@ds213513.mlab.com:13513/heroku_7hqwbwlk', { useNewUrlParser: true });

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
// mongoose.connect(MONGODB_URI);

// Connect to the Mongo DB
// Routes
// -----------------

require('./routes/api-routes.js')(app);
require('./routes/html-routes.js')(app);

// Starts our server on the predefined PORT
app.listen(PORT, function(){
  console.log(`App is running: http://localhost:${PORT}`)
})