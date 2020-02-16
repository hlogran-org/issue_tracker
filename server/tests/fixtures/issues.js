"use strict";

const { allUsers } = require("./users");

const createMockIssue = (priorities, daysBefore = 0) => {
  if (!Array.isArray(priorities)) {
    priorities = [priorities];
  }
  const created_at = new Date();
  created_at.setDate(created_at.getDate() - daysBefore);

  return {
    number: Math.floor(Math.random() * 1000),
    title: "The issue's title",
    assignees: [allUsers[Math.floor(Math.random() * allUsers.length)]],
    labels: priorities.map(priority => ({ name: priority })),
    created_at: created_at.toISOString(),
    html_url: ""
  };
};

const issue_critical_priority_today = createMockIssue("Critical Priority");
const issue_very_high_priority_today = createMockIssue("Very High Priority");
const issue_high_priority_today = createMockIssue("High Priority");
const issue_mid_priority_today = createMockIssue("Mid Priority");
const issue_low_priority_today = createMockIssue("Low Priority");
const issue_no_priority_today = createMockIssue("NO_PRIORITY");
const issue_all_priorities_today = createMockIssue([
  "Critical Priority",
  "Very High Priority",
  "High Priority",
  "Mid Priority",
  "Low Priority"
]);

const issue_low_priority_seven_days_ago = createMockIssue("Low Priority", 7);

module.exports = {
  issue_critical_priority_today,
  issue_very_high_priority_today,
  issue_high_priority_today,
  issue_mid_priority_today,
  issue_low_priority_today,
  issue_all_priorities_today,
  issue_no_priority_today,
  issue_low_priority_seven_days_ago,
  allIssues: [
    issue_critical_priority_today,
    issue_very_high_priority_today,
    issue_high_priority_today,
    issue_mid_priority_today,
    issue_low_priority_today,
    issue_all_priorities_today,
    issue_no_priority_today,
    issue_low_priority_seven_days_ago
  ]
};
