let timers = {};
let intervals = {};

function startTimer(tableId) {
    if (intervals[tableId]) return; // ป้องกันการเริ่มซ้ำ

    // เก็บเวลาเริ่มต้นด้วย performance.now()
    const startTime = performance.now() - (timers[tableId] || 0);
    intervals[tableId] = setInterval(() => {
        // คำนวณเวลาให้เป็น milliseconds
        timers[tableId] = Math.floor(performance.now() - startTime);
        document.getElementById(`timer${tableId}`).innerText = formatTime(timers[tableId]);
    }, 1000);
}

function stopTimer(tableId) {
    clearInterval(intervals[tableId]);
    intervals[tableId] = null;
}

function resetTimer(tableId) {
    stopTimer(tableId);
    timers[tableId] = 0;
    document.getElementById(`timer${tableId}`).innerText = "00:00:00";
}

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}
