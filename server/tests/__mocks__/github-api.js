"use strict";

const { allIssues: mockIssues } = require("../fixtures/issues");
const { allUsers: mockUsers } = require("../fixtures/users");

module.exports = class GitHub {
  getIssues() {
    return {
      async listIssues() {
        return { data: mockIssues };
      }
    };
  }
  getOrganization() {
    return {
      async listMembers() {
        return { data: mockUsers };
      }
    };
  }
};
