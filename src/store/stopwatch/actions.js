//import Vue from "vue";

var timeBegan = null,
  timeStopped = null,
  stoppedDuration = 0,
  started = null,
  clock = null,
  running = false;

window.addEventListener("keyup", (e) => {
  var key = e.key;
  if (key === " ") {
    start();
  }
});

window.addEventListener("keydown", (e) => {
  var key = e.key;
  if (key !== " ") {
    stop();
  }
});

function start() {
  if (running) return;

  if (timeBegan === null) {
    reset();
    timeBegan = new Date();
  }

  if (timeStopped !== null) {
    stoppedDuration += new Date() - timeStopped;
  }

  started = setInterval(clockRunning, 10);
  running = true;
}

function stop() {
  running = false;
  timeStopped = new Date();
  clearInterval(started);
}

function reset() {
  running = false;
  clearInterval(started);
  stoppedDuration = 0;
  timeBegan = null;
  timeStopped = null;
  clock.time = "00:00:00.000";
}

function clockRunning() {
  var currentTime = new Date(),
    timeElapsed = new Date(currentTime - timeBegan - stoppedDuration),
    min = timeElapsed.getUTCMinutes(),
    sec = timeElapsed.getUTCSeconds(),
    ms = timeElapsed.getUTCMilliseconds();

  clock.time = zeroPrefix(min, 2) + ":" + zeroPrefix(sec, 2) + "." + zeroPrefix(ms, 3);
}

function zeroPrefix(num, digit) {
  var zero = "";
  for (var i = 0; i < digit; i++) {
    zero += "0";
  }
  return (zero + num).slice(-digit);
}
