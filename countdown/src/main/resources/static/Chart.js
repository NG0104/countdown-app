<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>カウントダウングラフ</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 30px; }
        canvas { margin: 20px auto; max-width: 600px; display: block; }
        .countdown { font-size: 24px; margin-bottom: 20px; }
    </style>
</head>
<body>
    <h1 id="title">イベントカウントダウン</h1>
    <div class="countdown" id="countdown"></div>

    <canvas id="barChart"></canvas>
    <canvas id="pieChart"></canvas>
    <canvas id="doughnutChart"></canvas>
    <canvas id="lineChart"></canvas>

    <!-- ⭐ 新しい横棒プログレスバー -->
    <canvas id="progressChart"></canvas>

    <script src="script.js"></script>
</body>
</html>
