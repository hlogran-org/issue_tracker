"use strict";
const request = require("supertest");
const app = require("../../src/api/app");
const { allIssues: mockIssues } = require("../fixtures/issues");
const { user1 } = require("../fixtures/users");
const server = request(app);

describe("GET /issues", () => {
  test("Returns all issues", async () => {
    const response = await server
      .get("/issues")
      .expect(200)
      .expect("Content-Type", /json/);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(mockIssues.length);

    //check if scores are in order
    const scores = response.body.map(issue => issue.score);
    const scoresInOrder = scores.concat().sort((a, b) => b - a);
    expect(scores).toEqual(scoresInOrder);
  });
});

describe("GET /users/:user/issues", () => {
  test("Returns only user's issues", async () => {
    const response = await server
      .get(`/users/${user1.login}/issues`)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(
      mockIssues.filter(issue =>
        issue.assignees.some(assignee => assignee.login === user1.login)
      ).length
    );
  });
});
