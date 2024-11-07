document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById('mychart').getContext('2d');

  // 初期データ
  let chartData = [1000, 1200, -500, 1300, -200]; // 初期の口座残高データの例（マイナス値を含む）
  const chartLabels = ['1', '2', '3', '4', '5']; // 日数（1日目から）

  // チャートの作成
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: chartLabels,
      datasets: [{
        label: 'Account Balance',
        data: chartData,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Day'
          }
        },
        y: {
          beginAtZero: false, // 0を基点とせず、データ範囲に合わせる
          title: {
            display: true,
            text: 'Balance'
          },
          ticks: {
            callback: function(value) {
              return value; // メモリにマイナス値を表示
            }
          }
        }
      }
    }
  });

  // 各入力フィールドで数値が入力されるたびにチャートを更新
  const inputs = document.querySelectorAll('.data-input');
  inputs.forEach(input => {
    input.addEventListener('input', function () {
      // 各セルの値を収集してチャートを更新
      const newData = Array.from(inputs).map(input => {
        const value = parseFloat(input.value.trim());
        return isNaN(value) ? 0 : value; // NaNの場合は0にする
      });

      myChart.data.datasets[0].data = newData;
      myChart.update(); // チャートを更新
    });
  });

  document.getElementById('downloadImage').addEventListener('click', function () {
    const link = document.createElement('a');
    link.href = myChart.toBase64Image();
    link.download = 'chart_image.png';
    link.click();
  });
});
