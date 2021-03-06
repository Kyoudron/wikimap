"use strict";
require('dotenv').config();
const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
var cookieParser = require('cookie-parser')
// Password encryption and COOKIES
// const cookieSession = require("cookie-session");
// const bcrypt = require('bcryptjs');
// const password = "purple-monkey-dinosaur";
// const hashed_password = bcrypt.hashSync(password, 10);
// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const mapsRoutes = require("./routes/maps");
const profileMaps = require("./routes/profilemaps")
const profileFav = require("./routes/profilefav")
const getMarkers = require("./routes/getmarkers")

// const checkIfLoggedIn = require("./routes/checkIfLoggedIn");
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
// // Mount all resource routes
app.use("/api/users", usersRoutes(knex));
app.use("/api/maps", mapsRoutes(knex));
app.use("/api/profilemaps", profileMaps(knex));
app.use("/api/profilefav", profileFav(knex));
app.use("/api/getmarkers", getMarkers(knex));

function checkIfLoggedIn(req, res) {
    if (req.cookies.cookieName) {
        return true;
    }
}

// ALL GET REQUEST!


// HOME PAGE
app.get("/", (req, res) => {
  let loggedIn = checkIfLoggedIn(req, res)
  let templateVars = {
    mapId: req.params.id,
    loggedIn: loggedIn
  }
  res.render("index", templateVars);
});

//CREATE PAGE
app.get("/maps/new", (req, res) => {
  let loggedIn = checkIfLoggedIn(req, res)
  if(loggedIn === undefined) {
    res.redirect("/login")
  }
  let templateVars = {
    mapId: req.params.id,
    loggedIn: loggedIn
  }
  res.render("create", templateVars);
})

// PROFILE PAGE
app.get("/profile", (req, res) => {
  let loggedIn = checkIfLoggedIn(req, res)
  let templateVars = {
    mapId: req.params.id,
    loggedIn: loggedIn
  }
  res.render("profile", templateVars);
})
// Routes for user-authentification
app.get("/login", (req, res) => {
  let loggedIn = checkIfLoggedIn(req, res)
  let templateVars = {
    mapId: req.params.id,
    loggedIn: loggedIn
  }
  res.render("login", templateVars);
});
// this redirects to the specific map
app.get("/maps/:id", (req, res) => {
  let loggedIn = checkIfLoggedIn(req, res)

  let templateVars = {
    mapId: req.params.id,
    loggedIn: loggedIn,
    username: req.cookies.username
  }
  res.render("viewedit", templateVars)
})


// ALL POST REQUEST!

app.post("/maps", (req, res) => {
  console.log(req.body.title)
    knex('maps')
      .insert (
      {title: req.body.title, creator_id: req.cookies.cookieName})
      .returning('id')
      .then((results) => {
  res.redirect(`/maps/${results}`)
  });
});

app.post("/profile", (req, res)=>{
    console.log(req.body)
    knex('users_maps')
      .insert({map_id: req.body.mapId, user_id: req.cookies.cookieName, favourites: true})
      .then((results) => {
    res.redirect('/profile')
    });
  })

app.post("/maps/:id/markers", (req, res) => {
    console.log(req.body);
    let markerArr = [];
    for (let obj in (req.body.markers)) {
      req.body.markers[obj].user_id = req.cookies.cookieName;
      req.body.markers[obj].map_id = ((req.headers.referer).substr(27, req.headers.referer.length));
      markerArr.push(req.body.markers[obj]);
    }
    console.log(markerArr);

    let chunkSize = markerArr.length;

    knex.batchInsert('markers', markerArr, chunkSize)
      .returning('*')
      .then(function() {
        console.log('Insert is working!')
      })
      .catch(function(error) {
        console.log(error)
    });
})


app.post("/login", (req, res) => {
  if (req.body.email === "" || req.body.password === "") {
    res.status(400);
    res.send("Error 400 : Please fill in all fields.");
  }
    knex.select('*')
        .from('users')
        .where('users.email', req.body.email)
        .then((results) => {
          let user = results[0]
              if (req.body.password === user.password) {
              let cookieValue = user.id;
              let name = user.email;
              res.cookie('cookieName', cookieValue);
              res.cookie('username', name)

              res.redirect("/")
            } else {
              res.redirect("/login");
            }
        })
        .catch((error) => {
        res.send(`Please try again. Email and password do not match. <a href="/login">Back.</a>`);
    })
});


app.post("/logout", (req, res) => {
  let templateVars = {}
  // res.cookie('cookieName', {expires: 1});
  res.clearCookie('cookieName');
  res.clearCookie('username')
  res.redirect('/login');
});
app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);

});
