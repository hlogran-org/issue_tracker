"use strict";

const express = require("express");
const UsersService = require("../../services/users.js");

const router = new express.Router();
const usersService = new UsersService();

router.get("/users", async (req, res) => {
  try {
    const users = await usersService.getAll();
    res.json(users);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
