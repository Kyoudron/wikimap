"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
router.get("/", (req, res) => {
  knex('maps')
    .join('users_maps', 'maps.id', '=', 'users_maps.map_id')
    .select("*")
    .from('maps')
    .where({user_id: req.cookies.cookieName, favourites: true})
    .then((results) => {
      res.json(results)
    });
  })
  return router;
}
