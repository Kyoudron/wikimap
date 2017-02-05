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

// // Mount all resource routes
app.use(express.static("public"));
app.use("/api/users", usersRoutes(knex));
app.use("/api/maps", mapsRoutes(knex));
app.use("/api/profilemaps", profileMaps(knex));

function checkIfLoggedIn(req, res) {
    if (req.cookies.cookieName) {
        return true;
      } else {
        return false;
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
  let loggedIn = checkIfLoggedIn(req, res);
  let templateVars = {
    mapId: req.params.id,
    loggedIn: loggedIn
  }
  res.render("create", templateVars);
});

app.get("/view", (req, res) => {
  let loggedIn = checkIfLoggedIn(req, res);
  let templateVars = {
    mapId: req.params.id,
    loggedIn : loggedIn
  }
  res.render("viewedit", templateVars);
});


app.get("/maps/:id", (req, res) => {
  let loggedIn = checkIfLoggedIn(req, res)
  let templateVars = {
    mapId: req.params.id,
    loggedIn : loggedIn
  }

  res.render("viewedit", templateVars)
})

//NOTE: Claire added a post here -- do we need this
app.post("/map/:id", (req, res) => {
  let loggedIn = checkIfLoggedIn(req, res)
  let templateVars = {
    mapId: req.params.id,
    loggedIn: loggedIn
  }
  res.render("/map/:id", templateVars);
});

//create isn't a page any more -- delete this get and post
app.get("/create", (req, res) => {
  let loggedIn = checkIfLoggedIn(req, res)
  let templateVars = {
    mapId: req.params.id,
    loggedIn: loggedIn
  }
  res.render("create", templateVars);
})

app.post("/create", (req, res) => {
    res.redirect("/profile");
});

//do we need this page
app.get("/view", (req, res) => {
  let loggedIn = checkIfLoggedIn(req, res)
  let templateVars = {
    loggedIn: loggedIn
  }
  res.render("viewedit", templateVars);
})

//going to have to be profile/:id

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
        // console.log(results)
  res.redirect(`/maps/${results}`)
      // res.json({ success: true, message: 'ok', id: results });
  // let redirect_url = `/maps/${id[0]}`
  // res.send(200)
  });
});

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
              // let cookieValue = user.email;
              res.cookie('cookieName', cookieValue);
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
  res.redirect('/login');
});
app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});


// this redirects to the specific map
app.get("/maps/:id", (req, res) => {
  let loggedIn = checkIfLoggedIn(req, res)
  let mapId= req.params.mapId;
  let templateVars = {
    mapId: mapId,
    loggedIn: loggedIn,
  }
  res.render("viewedit", templateVars)
})
