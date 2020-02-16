"use strict";
const request = require("supertest");
const app = require("../../src/api/app");
const server = request(app);
const { allUsers: mockUsers } = require("../fixtures/users");

describe("GET /users", () => {
  test("Returns all users", async () => {
    const response = await server
      .get("/users")
      .expect(200)
      .expect("Content-Type", /json/);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(mockUsers.length);
  });
});
