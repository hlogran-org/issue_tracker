"use strict";

const express = require("express");
const router = new express.Router();

const IssuesService = require("../../services/issues.js");

const issuesService = new IssuesService();

router.get("/issues", async (req, res) => {
  try {
    const issues = await issuesService.getAll();
    res.json(issues);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
