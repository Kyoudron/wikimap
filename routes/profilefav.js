"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
router.get("/", (req, res) => {
  knex
    .select("*")
    .from("maps")
    .join("users_maps")
    .on("users_maps.map_id=map.id")
    .where({user_id: req.cookies.cookieName, favourites: true})
    .then((results) => {
      res.json(results)
    });
})
  // router.post("/", (req, res) => {
  //   console.log(req.body)
  //   knex('users_maps')
  //     .insert({map_id: req.body.mapId, user_id: req.cookies.cookieName, favourites: true})
  //     .then((results) => {
  //       // console.log(results)
  //   res.redirect('/profile')
  //   });
  // })
  return router;
}
