let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCounter = 1;

const display = document.getElementById('display');
const laps = document.getElementById('laps');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');

startButton.addEventListener('click', () => {
    if (!running) {
        startTime = Date.now() - (difference || 0);
        tInterval = setInterval(update, 1);
        running = true;
        toggleButtons(true);
    }
});

pauseButton.addEventListener('click', () => {
    if (running) {
        clearInterval(tInterval);
        running = false;
        toggleButtons(false);
    }
});

resetButton.addEventListener('click', () => {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.textContent = '00:00:00.000';
    laps.innerHTML = '';
    lapCounter = 1;
    toggleButtons(false);
});

lapButton.addEventListener('click', () => {
    if (running) {
        const lapTime = display.textContent;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter++}: ${lapTime}`;
        laps.appendChild(lapItem);
    }
});

function update() {
    updatedTime = Date.now();
    difference = updatedTime - startTime;
    display.textContent = formatTime(difference);
}

function formatTime(ms) {
    const hours = String(Math.floor(ms / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((ms % 3600000) / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
    const milliseconds = String(ms % 1000).padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function toggleButtons(isRunning) {
    startButton.disabled = isRunning;
    pauseButton.disabled = !isRunning;
    resetButton.disabled = isRunning;
    lapButton.disabled = !isRunning;
}
