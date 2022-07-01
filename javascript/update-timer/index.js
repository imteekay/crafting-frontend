function updateTimer(isoDate, timerInfo = {}) {
  let date = new Date(isoDate);
  let seconds = date.getSeconds();
  let minutes = date.getMinutes();
  let hours = date.getHours();

  setInterval(() => {
    timerInfo.seconds = seconds;
    timerInfo.minutes = minutes;
    timerInfo.hours = hours;

    seconds++;

    if (seconds >= 60) {
      seconds = seconds % 60;
      minutes++;

      if (minutes >= 60) {
        minutes = minutes % 60;
        hours++;

        if (hours >= 24) {
          hours = 0;
        }
      }
    }
  }, 1000);
}

let timerInfo = {
  seconds: 0,
  minutes: 0,
  hours: 0,
};

updateTimer('2022-07-01T12:59:51-03:00', timerInfo);

console.log(timerInfo);
