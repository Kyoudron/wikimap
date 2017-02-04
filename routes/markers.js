"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("markers")
      .then((results) => {
        res.json(results);
    });
  });

  router.post("/", (req, res) => {
     knex('markers')
     .insert (
        {title: req.body.markerTitle,
        description: req.body.markerDescription,
        img: req.bod.markers.markerImage,
        latitude: req.body.markerCoordinates.lat,
        longitude: req.body.markerCoordinates.lng,
        map_id: 1,
        user_id: 1})
        .then((results) => {
          res.json({ success: true, message: 'ok' });
    });
  });

  return router;
}
