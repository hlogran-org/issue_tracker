"use strict";
const weightScoreFunction = require("../../src/helpers/weightScoreFunction");
const {
  issue_critical_priority_today,
  issue_very_high_priority_today,
  issue_high_priority_today,
  issue_mid_priority_today,
  issue_low_priority_today,
  issue_no_priority_today,
  issue_all_priorities_today,
  issue_low_priority_seven_days_ago
} = require("../fixtures/issues");

describe("weightScoreFunction", () => {
  test("Critical Priority", async () => {
    expect(weightScoreFunction(issue_critical_priority_today)).toBe(1000);
  });

  test("Very Hight Priority", async () => {
    expect(weightScoreFunction(issue_very_high_priority_today)).toBe(500);
  });

  test("Hight Priority", async () => {
    expect(weightScoreFunction(issue_high_priority_today)).toBe(50);
  });

  test("Mid Priority", async () => {
    expect(weightScoreFunction(issue_mid_priority_today)).toBe(15);
  });

  test("Low Priority", async () => {
    expect(weightScoreFunction(issue_low_priority_today)).toBe(7);
  });

  test("No Priority specified", async () => {
    expect(weightScoreFunction(issue_no_priority_today)).toBe(1);
  });

  test("Multiple priorities specified", async () => {
    expect(weightScoreFunction(issue_all_priorities_today)).toBe(1000);
  });

  test("One week old issue with low priority", async () => {
    expect(weightScoreFunction(issue_low_priority_seven_days_ago)).toBe(7 * 5);
  });
});
