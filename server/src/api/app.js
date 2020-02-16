"use strict";

const express = require("express");
const usersRouter = require("./routers/users");
const issuesRouter = require("./routers/issues");

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.use(usersRouter);
app.use(issuesRouter);

module.exports = app;
