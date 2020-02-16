"use strict";

module.exports = issue => {
  const workingDays = getWorkingDays(issue.created_at);
  const labelsWeight = getLabelsWeight(issue.labels);

  return workingDays * labelsWeight;
};

function getWorkingDays(created_at) {
  const startDate = new Date(created_at);
  const endDate = new Date();

  let count = 0;
  let curDate = startDate;
  while (curDate <= endDate) {
    const dayOfWeek = curDate.getDay();
    if ([0, 6].indexOf(dayOfWeek) === -1) {
      count++;
    }
    curDate.setDate(curDate.getDate() + 1);
  }
  return count || 1;
}

function getLabelsWeight(labels) {
  const weights = {
    "Critical Priority": 1000,
    "Very High Priority": 500,
    "High Priority": 50,
    "Mid Priority": 15,
    "Low Priority": 7
  };

  for (var prop in weights) {
    if (Object.prototype.hasOwnProperty.call(weights, prop)) {
      if (
        labels.some(
          label => label.name.toLowerCase().trim() === prop.toLowerCase().trim()
        )
      ) {
        return weights[prop];
      }
    }
  }

  return 1;
}
