"use strict";
const request = require("supertest");
const app = require("../../src/api/app");
const server = request(app);

describe("GET /users", () => {
  test("Returns all users", async () => {
    const response = await server
      .get("/users")
      .expect(200)
      .expect("Content-Type", /json/);

    expect(Array.isArray(response.body)).toBe(true);
  });
});
