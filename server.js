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

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// // Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// HOME PAGE
app.get("/", (req, res) => {
  res.render("index");
});


//CREATE PAGE
app.get("/create", (req, res) => {
  res.render("create");
});

app.get("/view", (req, res) => {
  res.render("viewedit");
});

app.get("/profile", (req, res) => {
  res.render("profile");
});

app.post("/create", (req, res) => {

    console.log('Posting to server ...');

    console.log(req.body);

    knex('maps').insert(
      {title: req.body.mapTitle},
      // {creator_id: req.body.user_id}
    );
    for (let i in req.body.markers) {
      console.log(req.body.markers[i])
      knex('markers').insert(
        {title: req.body.markers[i].markerTitle},
        {description: req.body.markers[i].markerDescription},
        {img: req.body.markers[i].markerImage},
        {latitude: req.body.markers[i].markerCoordinates.lat},
        {longitude: req.body.markers[i].markerCoordinates.lng},
        // {map_id: knex.from('maps').innerJoin('map_id', 'title', req.body.mapTitle)},
        // {user_id: req.body.user_id}
      );
    }
});

app.post("/create", (req, res) => {
  console.log("some text")
  console.log(req.body)

	//need some variables passed in here
	// let templateVars = {
	// 		map : req.body.map
	// }

	res.redirect("/profile");
})


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
