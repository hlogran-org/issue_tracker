"use strict";
const githubAPI = require("../integration/githubAPI");

module.exports = class UsersService {
  async getAll() {
    try {
      const users = await githubAPI.getUsers();
      return users;
    } catch (err) {
      throw err;
    }
  }
};
