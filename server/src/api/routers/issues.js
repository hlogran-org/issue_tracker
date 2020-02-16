"use strict";

const express = require("express");
const router = new express.Router();

router.get("/issues", async (req, res) => {
  res.status(501).send({ error: "Not Implemented" });
});

module.exports = router;
