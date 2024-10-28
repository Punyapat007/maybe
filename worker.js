let timers = {};

self.onmessage = function(e) {
    const { action, customerId } = e.data;

    if (action === 'start') {
        // ตรวจสอบว่า timer นี้มีอยู่แล้วหรือไม่
        if (!timers[customerId]) {
            timers[customerId] = { seconds: 0, startTime: performance.now() };

            // เริ่มต้น interval สำหรับการอัปเดตทุกวินาที
            timers[customerId].interval = setInterval(() => {
                // คำนวณเวลาที่ผ่านไป
                const currentTime = performance.now();
                const elapsed = Math.floor((currentTime - timers[customerId].startTime) / 1000);
                timers[customerId].seconds = elapsed;

                self.postMessage({ customerId, seconds: timers[customerId].seconds });
            }, 1000);
        }
    } else if (action === 'stop') {
        // หยุด timer และลบข้อมูล
        if (timers[customerId]) {
            clearInterval(timers[customerId].interval);
            delete timers[customerId];
        }
    } else if (action === 'reset') {
        // รีเซ็ต timer
        if (timers[customerId]) {
            clearInterval(timers[customerId].interval);
            timers[customerId].seconds = 0;
            timers[customerId].startTime = performance.now(); // รีเซ็ต start time
            self.postMessage({ customerId, seconds: 0 });
        } else {
            // ถ้าหากไม่มี timer ให้ส่งค่า 0
            self.postMessage({ customerId, seconds: 0 });
        }
    }
};
