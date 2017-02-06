"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {
  router.get("/", (req, res) => {
    knex
      .select('*')
      .from('markers')
      .where({map_id: ((req.headers.referer).substr(27, req.headers.referer.length))})
      .then((results) => {
        res.json(results)
      })
      .catch(function(error) {
        console.log(error)
    })
  })
  return router;
}
