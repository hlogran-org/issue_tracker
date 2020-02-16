"use strict";

const express = require("express");
const weightsScodeFunction = require("../../helpers/weightScoreFunction");
const IssuesService = require("../../services/issues.js");

const router = new express.Router();
const issuesService = new IssuesService(weightsScodeFunction);

router.get("/issues", async (req, res) => {
  try {
    const issues = await issuesService.getAll();
    res.json(issues);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get("/users/:user/issues", async (req, res) => {
  res.status(501).send({ error: "Not implemented" });
});

module.exports = router;
