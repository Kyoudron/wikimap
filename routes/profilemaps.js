"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("maps")
      .where({creator_id: 3})
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}


