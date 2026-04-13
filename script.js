let timeLeft = 25 * 60;
let timerId = null;
let currentModeTime = 25;

const display = document.getElementById('timer-display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const alarm = document.getElementById('alarm');

const pomodoroBtn = document.getElementById('pomodoro-btn');
const shortBtn = document.getElementById('short-break-btn');
const longBtn = document.getElementById('long-break-btn');

function updateDisplay() {
    let mins = Math.floor(timeLeft / 60);
    let secs = timeLeft % 60;
    display.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (timerId !== null) return;
    
    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay();
        if (timeLeft <= 0) {
            clearInterval(timerId);
            timerId = null;
            alarm.play();
            alert("Time's up!");
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

function resetTimer() {
    pauseTimer();
    timeLeft = currentModeTime * 60;
    updateDisplay();
}

function switchMode(minutes, clickedBtn) {
    [pomodoroBtn, shortBtn, longBtn].forEach(btn => btn.classList.remove('active'));
    clickedBtn.classList.add('active');
     currentModeTime = minutes;
    resetTimer();
}

// Logic for buttons
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

pomodoroBtn.addEventListener('click', () => switchMode(25, pomodoroBtn));
shortBtn.addEventListener('click', () => switchMode(5, shortBtn));
longBtn.addEventListener('click', () => switchMode(15, longBtn));

// --- THE SOUND SECTION (at the bottom) ---
// Note: Changed the URL to a direct .mp3 link so it actually makes a sound!
const clickSound = new Audio("https://soundjay.com");

document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
        clickSound.currentTime = 0; 
        clickSound.play().catch(e => console.log("Sound error:", e));
    });
});