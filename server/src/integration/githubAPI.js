"use strict";
const GitHub = require("github-api");
const { TOKEN, ORGANIZATION, REPO } = require("../config/gh-connection.json");

const gh = new GitHub({
  token: TOKEN
});

module.exports = {
  getIssues: async () => {
    const { data: issues } = await gh
      .getIssues(ORGANIZATION, REPO)
      .listIssues();
    return issues;
  },
  getUsers: async () => {
    var { data: users } = await gh.getOrganization(ORGANIZATION).listMembers();
    return users;
  }
};
