"use strict";


const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("maps")
      .then((results) => {
        res.json(results);
    });
  });



  router.post("/", (req, res) => {
  console.log(req.body);
    knex('maps')
      .insert (
      {title: req.body.mapTitle, creator_id: 2})
  for (let i in req.body.markers) {
    knex('markers')
      .insert (
        {title: req.body.markers[i].markerTitle},
        {description: req.body.markers[i].markerDescription},
        {img: req.body.markers[i].markerImage},
        {latitude: req.body.markers[i].markerCoordinates.lat},
        {longitude: req.body.markers[i].markerCoordinates.lng})
      {map_id: knex.from('maps').innerJoin('map_id', 'title', req.body.mapTitle)},
      {user_id: req.body.user_id}
      .then((results) => {
      res.json({ success: true, message: 'ok' });
    })

  });


  return router;
}
