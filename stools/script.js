// 更新后的 script.js
const bpmInput = document.getElementById('bpm');
const startStopButton = document.getElementById('startStop');
const visual = document.getElementById('visual');

let isRunning = false;
let intervalId;
// 创建AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

startStopButton.addEventListener('click', function() {
    if (isRunning) {
        stopMetronome();
    } else {
        startMetronome();
    }
});

function startMetronome() {
    const bpm = parseInt(bpmInput.value);
    const interval = (60 / bpm) * 1000;

    // 使用setInterval汇总声音和光的闪烁
    intervalId = setInterval(() => {
        flash();
        playClick(); // 播放声音的函数调用
    }, interval);
    startStopButton.textContent = '停止';
    isRunning = true;
}

function stopMetronome() {
    clearInterval(intervalId);
    visual.style.backgroundColor = '#e6e6e6';
    startStopButton.textContent = '开始';
    isRunning = false;
}

function flash() {
    visual.style.backgroundColor = 'green';
    setTimeout(() => {
        visual.style.backgroundColor = '#e6e6e6';
    }, 100);
}

// 添加一个播放声音的函数
function playClick() {
    const oscillator = audioContext.createOscillator();
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime); // 设置声音频率
    oscillator.type = 'wave'; // 选择声音类型
    oscillator.connect(audioContext.destination); // 连接到输出
    oscillator.start(); // 开始播放
    oscillator.stop(audioContext.currentTime + 0.1); // 停止播放，0.1秒后
}