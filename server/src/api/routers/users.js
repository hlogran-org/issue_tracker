"use strict";

const express = require("express");
const router = new express.Router();

router.get("/users", async (req, res) => {
  res.status(501).send({ error: "Not implemented" });
});

module.exports = router;
