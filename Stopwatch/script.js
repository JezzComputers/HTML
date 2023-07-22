let startTime, intervalId;
let running = false;
let paused = false;

function startStop() {
  if (running) {
    clearInterval(intervalId);
    document.getElementById("startStop").textContent = "Start";
    running = false;
  } else {
    if (paused) {
      startTime = Date.now() - (paused - startTime);
      paused = false;
    } else {
      startTime = Date.now();
    }
    document.getElementById("startStop").textContent = "Stop";
    intervalId = setInterval(updateTime, 10);
    running = true;
  }
}

function pause() {
  if (running) {
    clearInterval(intervalId);
    document.getElementById("startStop").textContent = "Start";
    paused = Date.now();
    running = false;
  }
}

function updateTime() {
  const currentTime = Date.now() - startTime;
  const minutes = Math.floor(currentTime / 60000);
  const seconds = Math.floor((currentTime % 60000) / 1000);
  const milliseconds = Math.floor((currentTime % 1000) / 10);
  document.getElementById("display").textContent = `${padZero(minutes)}:${padZero(seconds)}:${padZero(milliseconds)}`;
}

function padZero(num) {
  return num.toString().padStart(2, '0');
}

function lap() {
  if (running) {
    const currentTime = Date.now() - startTime;
    const lapTime = formatTime(currentTime);
    const lapList = document.getElementById("laps");
    const lapItem = document.createElement("li");
    lapItem.textContent = lapTime;
    lapList.appendChild(lapItem);
  }
}

function formatTime(time) {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);
  return `${padZero(minutes)}:${padZero(seconds)}:${padZero(milliseconds)}`;
}

function clearStopwatch() {
    clearInterval(intervalId);
    document.getElementById("display").textContent = "00:00:00";
    document.getElementById("startStop").textContent = "Start";
    document.getElementById("laps").innerHTML = "";
    running = false;
    paused = false;
  }  