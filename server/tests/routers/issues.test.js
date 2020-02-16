"use strict";
const request = require("supertest");
const app = require("../../src/api/app");
const server = request(app);

describe("GET /issues", () => {
  test("Returns all issues", async () => {
    const response = await server
      .get("/issues")
      .expect(200)
      .expect("Content-Type", /json/);

    expect(Array.isArray(response.body)).toBe(true);
  });
});
