"use strict";
const githubAPI = require("../integration/githubAPI");

module.exports = class IssuesService {
  constructor(weightScoreFunction = () => 0) {
    this.weightScoreFunction = weightScoreFunction;
  }
  _parseIssuesList(issues) {
    return issues
      .map(issue =>
        Object.assign({ score: this.weightScoreFunction(issue) }, issue)
      )
      .sort((a, b) => b.score - a.score);
  }
  async getAll() {
    try {
      const issues = await githubAPI.getIssues();
      return this._parseIssuesList(issues);
    } catch (err) {
      throw err;
    }
  }
};
