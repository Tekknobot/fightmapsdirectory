// server.js
// where your node app starts

// init project
var express = require('express');
var Sequelize = require('sequelize');
var app = express();

// default user list
var users = [
      // ["Choose"],
      // ["Street Fighter IV","50-52nd Street", "New York", "United States"],
      // ["Street Fighter III","50-52nd Street", "New York", "United States"]
    ];
var User;

// setup a new database
// using database credentials set in .env
var sequelize = new Sequelize('database', process.env.DB_USER, process.env.DB_PASS, {
  host: '0.0.0.0',
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
    // Security note: the database is saved to the file `database.sqlite` on the local filesystem. It's deliberately placed in the `.data` directory
    // which doesn't get copied if someone remixes the project.
  
  storage: '.data/database.sqlite'
});

// authenticate with the database
sequelize.authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
    // define a new table 'users'
    User = sequelize.define('users', {
      machineName: {
        type: Sequelize.STRING
      },
      streetAddress: {
        type: Sequelize.STRING
      },
      cityName: {
        type: Sequelize.STRING
      },
      countryName: {
        type: Sequelize.STRING
      }
    });
    
    setup();
  })
  .catch(function (err) {
    console.log('Unable to connect to the database: ', err);
  });

// populate table with default users
function setup(){
  User.sync({force: false}) // We use 'force: true' in this example to drop the table users if it already exists, and create a new one. You'll most likely want to remove this setting in your own apps
    .then(function(){
      // Add the default users to the database
      for(var i=0; i<users.length; i++){ // loop through all users
        User.create({ machineName: users[i][0], streetAddress: users[i][1], cityName: users[i][2], countryName: users[i][3]}); // create a new entry in the users table
      }
    });  
}

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/users", function (request, response) {
  var dbUsers=[];
  User.findAll().then(function(users) { // find all entries in the users tables
    users.forEach(function(user) {
      dbUsers.push([user.machineName,user.cityName,user.streetAddress,user.countryName]); // adds their info to the dbUsers value
    });
    response.send(dbUsers); // sends dbUsers back to the page
  });
});

app.get("/toronto", function (request, response) {
  var dbUsers=[];
  User.findAll().then(function(users) { // find all "Toronto" entries in the users tables
    users.forEach(function(user) {
      if (user.streetAddress.value.indexOf('Toronto') > -1) {
        dbUsers.push([user.machineName,user.cityName,user.streetAddress,user.countryName]); // adds their info to the dbUsers value
      };
    });
  });
});

// creates a new entry in the users table with the submitted values
app.post("/users", function (request, response) {
  User.create({ machineName: request.query.machineName, cityName: request.query.cityName, streetAddress: request.query.streetAddress , countryName: request.query.countryName});
  response.sendStatus(200);
});

// drops the table users if it already exists, populates new users table it with just the default users.
app.get("/reset", function (request, response) {
  setup();
  response.redirect("/");
});

// removes all entries from the users table
app.get("/clear", function (request, response) {
  User.clear({where: {}});
  response.redirect("/");
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});