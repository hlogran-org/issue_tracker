"use strict";

const express = require("express");
const router = new express.Router();
const UsersService = require("../../services/users.js");

const usersService = new UsersService();

// start a game
router.get("/users", async (req, res) => {
  try {
    const users = await usersService.getAll();
    res.json(users);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
