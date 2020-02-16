"use strict";
const GitHub = require("github-api");
const { TOKEN, ORGANIZATION } = require("../config/gh-connection.json");

const gh = new GitHub({
  token: TOKEN
});

module.exports = {
  getUsers: async () => {
    var { data: users } = await gh.getOrganization(ORGANIZATION).listMembers();
    return users;
  }
};
