const inputBox = document.querySelector('.task-entry');
const startButton = document.getElementById('start-button');
const timer = document.getElementById('timer');
const displayText = document.getElementById('display-text');
const countdownDurationMinutes = 25;
const countdownDurationMs = countdownDurationMinutes * 60 * 1000;
const pomodoroText = document.getElementById('pomodoro-counter');
let timerFinishAudio = new Audio('TimerEndAudio.mp3');
let breakDuration = 5;
let pomodoroCounter = 0;
timer.style.opacity = '0';
displayText.style.opacity = '0';
function getInput() {
    let inputText = inputBox.value;
    inputBox.disabled = true;
    startButton.disabled = true;
    inputBox.style.opacity = '0';
    startButton.style.opacity = '0';
    displayText.innerHTML = inputText;
    timer.style.opacity = '100%';
    displayText.style.opacity = '100%';
    startWorkTimer();
}

function startWorkTimer() {
    let startTime = Date.now();
    let countdownWorkInterval = setInterval(() => {
        updateCountdown();
    }, 1000);

    function updateCountdown() {
        let elapsedTime =   Date.now() - startTime;

        let remainingTime = Math.max(countdownDurationMs - elapsedTime, 0) / 1000;

        if(remainingTime === 0) {
            clearInterval(countdownWorkInterval);
            if(pomodoroCounter === 4) {
                pomodoroCounter = 0;
                // breakDuration = 15
                startBreakTimer();
                timerFinishAudio.play();
                new Notification(`Your work time has ran out, take a break. Hopefully you got progress on ${inputBox.value}!`);
            } else {
                // breakDuration = 5;
                startBreakTimer();
                timerFinishAudio.play();      
                new Notification(`Your work time has ran out, take a break. Hopefully you got progress on ${inputBox.value}!`);
            }
        }

        let minutes = Math.floor(remainingTime / 60);
        let seconds = Math.floor(remainingTime % 60);
        timer.innerHTML = (`${minutes} minutes, ${seconds} seconds`);
    }
    pomodoroCounter++;
    pomodoroText.innerHTML = 'Pomodoro Counter: ' + pomodoroCounter;
}

function startBreakTimer() {
    let breakDurationMs = breakDuration * 60 * 1000;
    let startTime = Date.now();
    let countdownBreakInterval = setInterval(() => {
        updateBreakCountdown();
    }, 1000);

    function updateBreakCountdown() {
        let elapsedTime =   Date.now() - startTime;

        let remainingTime = Math.max(breakDurationMs - elapsedTime, 0) / 1000;

        if(remainingTime === 0) {
            clearInterval(countdownBreakInterval);
            startWorkTimer();
            timerFinishAudio.play();
            new Notification(`Your break time has ran out, time to work again!`);
        }

        let minutes = Math.floor(remainingTime / 60);
        let seconds = Math.floor(remainingTime % 60);
        if(minutes < 2) {
            timer.innerHTML = (`${minutes} minute, ${seconds} seconds`);
        } else {
            timer.innerHTML = (`${minutes} minutes, ${seconds} seconds`);
        }
    }
}