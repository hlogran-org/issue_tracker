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
  async getByUser(user) {
    try {
      const issues = await githubAPI.getIssues();
      const userIssues = issues.filter(issue =>
        issue.assignees.some(assignee => assignee.login === user)
      );
      return this._parseIssuesList(userIssues);
    } catch (err) {
      throw err;
    }
  }
};
