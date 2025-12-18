// ====================
// 設定
// ====================
const eventName = "卒業式";
const eventDate = new Date("2026-03-15T10:00:00");
const startDate = new Date("2025-04-30T00:00:00");

// ====================
// カウントダウン処理
// ====================
function updateCountdown() {
    const now = new Date();
    const diff = eventDate - now;

    if (diff <= 0) {
        document.getElementById("countdown").textContent = "イベントは終了しました！";
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    document.getElementById("countdown").textContent =
        `${eventName}まで: ${d}日 ${h}時間 ${m}分 ${s}秒`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// ====================
// 統計データ（例）
// ====================
const monthsPercent = 70;
const weeksPercent = 55;
const daysPercent = 30;
const lifePercent = 10;

// ====================
// 既存のグラフ（bar, pie, doughnut, line）
// ※ 簡易ダミーデータ
// ====================
new Chart(document.getElementById("barChart"), {
    type: "bar",
    data: {
        labels: ["A", "B", "C"],
        datasets: [{
            label: "Bar Example",
            data: [10, 20, 30]
        }]
    }
});

new Chart(document.getElementById("pieChart"), {
    type: "pie",
    data: {
        labels: ["X", "Y", "Z"],
        datasets: [{
            data: [30, 50, 20]
        }]
    }
});

new Chart(document.getElementById("doughnutChart"), {
    type: "doughnut",
    data: {
        labels: ["Done", "Left"],
        datasets: [{
            data: [40, 60]
        }]
    }
});

new Chart(document.getElementById("lineChart"), {
    type: "line",
    data: {
        labels: ["1", "2", "3", "4"],
        datasets: [{
            label: "Line Example",
            data: [10, 15, 12, 20]
        }]
    }
});

// ====================
// ⭐ 横棒プログレスバー（新追加）
// ====================
new Chart(document.getElementById("progressChart"), {
    type: "bar",
    data: {
        labels: ["Month", "Week", "Day", "Life"],
        datasets: [
            {
                label: "進捗率 (%)",
                data: [monthsPercent, weeksPercent, daysPercent, lifePercent],
                backgroundColor: [
                    "rgba(75, 192, 192, 0.8)",
                    "rgba(255, 205, 86, 0.8)",
                    "rgba(255, 99, 132, 0.8)",
                    "rgba(54, 162, 235, 0.8)"
                ],
                borderWidth: 1
            }
        ]
    },
    options: {
        indexAxis: "y",  // ← これで横棒になる！
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true }
        },
        scales: {
            x: {
                min: 0,
                max: 100,
                ticks: { stepSize: 10 }
            },
            y: {
                ticks: { font: { size: 14 } }
            }
        }
    }
});
