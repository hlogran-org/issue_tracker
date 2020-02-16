"use strict";
const githubAPI = require("../integration/githubAPI");

module.exports = class IssuesService {
  async getAll() {
    try {
      const issues = await githubAPI.getIssues();
      return issues;
    } catch (err) {
      throw err;
    }
  }
};
