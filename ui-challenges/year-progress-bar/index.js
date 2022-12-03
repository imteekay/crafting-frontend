const currentProgress = document.getElementById('current-progress');
const percentageProgress = document.getElementById('percentage-progress');

const today = new Date();
const year = today.getFullYear();

const isLeapYear = (year) =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

const getFebruaryDays = (year) => (isLeapYear(year) ? 29 : 28);

const daysPerMonth = {
  1: 31,
  2: getFebruaryDays(year),
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};

const countYearDays = (daysPerMonth) =>
  Object.values(daysPerMonth).reduce((acc, curr) => acc + curr);

const days = countYearDays(daysPerMonth);

const firstDate = new Date(`${year}-01-01`);
const lastDate = new Date(`${year}-12-31`);

const toDays = (milliseconds) =>
  Math.ceil(milliseconds / (1000 * 60 * 60 * 24));

const remainingMilliseconds = lastDate.getTime() - today.getTime();
const passedMilliseconds = today.getTime() - firstDate.getTime();

const passedDays = toDays(passedMilliseconds);
const toPercetage = (passedDays, days) => (passedDays / days) * 100;

const percentage = Math.floor(toPercetage(passedDays, days));
const stringPercentage = `${percentage}%`;

currentProgress.style.width = stringPercentage;
percentageProgress.textContent = stringPercentage;
