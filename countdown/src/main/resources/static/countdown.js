console.log("🔥🔥🔥 新しい countdown.js が読み込まれました 🔥🔥🔥");

console.log("🔥 countdown.js 読み込まれました");

// ==============================
// グローバル状態
// ==============================
let events = [];
let selectedEvent = null;

// Chart.js インスタンス
let barChart = null;
let pieChart = null;
let doughnutChart = null;
let lineChart = null;

// ==============================
// 初期処理
// ==============================
window.addEventListener("DOMContentLoaded", () => {
    loadEvents();
    setInterval(updateCountdownOnly, 1000);
    setInterval(updateAll, 30 * 1000);
});

// ==============================
// イベント一覧取得
// ==============================
function loadEvents() {
    console.log("🚀 loadEvents 開始");

    fetch("/api/events")
        .then(res => {
            if (!res.ok) throw new Error("API error");
            return res.json();
        })
        .then(data => {
            console.log("✅ イベント取得成功:", data);
            events = data;
            setupEventSelect();
        })
        .catch(err => {
            console.error("❌ イベント取得失敗:", err);
            document.getElementById("countdownText").textContent =
                "イベント情報を取得できません";
        });
}

// ==============================
// プルダウン作成
// ==============================
function setupEventSelect() {
    const select = document.getElementById("eventSelect");
    select.innerHTML = "";

    events.forEach(ev => {
        const option = document.createElement("option");
        option.value = ev.id;
        option.textContent = ev.name;
        select.appendChild(option);
    });

    if (events.length === 0) return;

    // 初期イベント
    selectedEvent = events[0];
    select.value = selectedEvent.id;
    updateView();

    // 切替
    select.addEventListener("change", () => {
        const id = Number(select.value);
        selectedEvent = events.find(e => e.id === id);
        resetCharts();
        updateView();
    });
}

// ==============================
// 表示更新（イベント切替時）
// ==============================
function updateView() {
    if (!selectedEvent) return;

    document.getElementById("title").textContent =
        `${selectedEvent.name} カウントダウン`;

    initChartsOnce();
    updateAll();
}

// ==============================
// カウントダウン表示（毎秒）
// ==============================
function updateCountdownOnly() {
    if (!selectedEvent) return;

    const now = new Date();
    const end = new Date(selectedEvent.eventDate);
    const diff = end - now;

    if (diff <= 0) {
        document.getElementById("countdownText").textContent =
            "イベントは終了しました";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const name = selectedEvent.name.endsWith("まで")
        ? selectedEvent.name
        : selectedEvent.name + "まで";

    document.getElementById("countdownText").textContent =
        `${name} ${days}日 ${hours}時間 ${minutes}分 ${seconds}秒`;

}

// ==============================
// 全体更新（30秒ごと）
// ==============================
function updateAll() {
    updateProgressBars();
    updateCharts();
}

// ==============================
// プログレスバー
// ==============================
function updateProgressBars() {
    if (!selectedEvent) return;

    const now = new Date();
    const end = new Date(selectedEvent.eventDate);
    const ms = end - now;

    const hours = Math.floor(ms / (1000 * 60 * 60));
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);

    setBar("hour", hours, 24, "時間");
    setBar("day", days, 30, "日");
    setBar("week", weeks, 4, "週");
    setBar("month", months, 12, "ヶ月");
}

function setBar(type, value, max, unit) {
    const percent = Math.max(0, Math.min(100, (value / max) * 100));
    document.getElementById(`bar-${type}`).style.width = percent + "%";
    document.getElementById(`label-${type}`).textContent =
        `あと${Math.max(0, value)}${unit}`;
}

// ==============================
// Chart.js 初期化
// ==============================
function initChartsOnce() {
    if (barChart || !selectedEvent) return;

    const d = computeDays();

    barChart = new Chart(barChartEl(), {
        type: "bar",
        data: {
            labels: ["経過日数", "残り日数"],
            datasets: [{ data: [d.elapsed, d.left] }]
        },
        options: { plugins: { legend: { display: false } } }
    });

    pieChart = new Chart(pieChartEl(), {
        type: "pie",
        data: {
            labels: ["経過日数", "残り日数"],
            datasets: [{ data: [d.elapsed, d.left] }]
        }
    });

    doughnutChart = new Chart(doughnutChartEl(), {
        type: "doughnut",
        data: {
            labels: ["経過日数", "残り日数"],
            datasets: [{ data: [d.elapsed, d.left] }]
        }
    });

    lineChart = new Chart(lineChartEl(), {
        type: "line",
        data: {
            labels: ["開始", "現在", "終了"],
            datasets: [{
                data: [0, d.elapsed, d.total],
                tension: 0.3
            }]
        },
        options: { plugins: { legend: { display: false } } }
    });
}

// ==============================
// グラフ更新
// ==============================
function updateCharts() {
    if (!barChart || !selectedEvent) return;

    const d = computeDays();

    barChart.data.datasets[0].data = [d.elapsed, d.left];
    pieChart.data.datasets[0].data = [d.elapsed, d.left];
    doughnutChart.data.datasets[0].data = [d.elapsed, d.left];
    lineChart.data.datasets[0].data = [0, d.elapsed, d.total];

    barChart.update();
    pieChart.update();
    doughnutChart.update();
    lineChart.update();
}

// ==============================
// 日数計算
// ==============================
function computeDays() {
    const now = new Date();
    const start = new Date(selectedEvent.startDate);
    const end = new Date(selectedEvent.eventDate);

    const total = Math.max(0,
        Math.floor((end - start) / (1000 * 60 * 60 * 24))
    );
    const left = Math.max(0,
        Math.floor((end - now) / (1000 * 60 * 60 * 24))
    );
    const elapsed = Math.max(0, total - left);

    return { total, left, elapsed };
}

// ==============================
// グラフ完全リセット
// ==============================
function resetCharts() {
    [barChart, pieChart, doughnutChart, lineChart].forEach(c => {
        if (c) c.destroy();
    });
    barChart = pieChart = doughnutChart = lineChart = null;
}

// ==============================
// DOM取得
// ==============================
const barChartEl = () => document.getElementById("barChart");
const pieChartEl = () => document.getElementById("pieChart");
const doughnutChartEl = () => document.getElementById("doughnutChart");
const lineChartEl = () => document.getElementById("lineChart");
