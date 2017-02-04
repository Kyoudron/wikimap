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


  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("markers")
      .then((results) => {
        res.json(results);
    });
  });


  router.post("/", (req, res) => {
  console.log(req.body);
    knex('maps')
      .insert (
      {title: req.body.mapTitle, creator_id: 2})
      .then((results) => {
      res.json({ success: true, message: 'ok' });
    })
  });

  router.post("/maps/:id", (req, res) => {

    let markerArr = [];
    for (let obj in (req.body.markers)) {
      req.body.markers[obj].user_id = req.cookie;
      req.body.markers[obj].map_id = req.params.id;
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


  return router;
}
