"use strict";

const express = require("express");
const usersRouter = require("./routers/users");

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.use(usersRouter);

module.exports = app;
