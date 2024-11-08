// コードのメモはREADMEにまとめる

// 変数を定義して、後続のコードでそれぞれの要素にイベントリスナーを追加したり、操作したりすることが容易になる
document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById('mychart').getContext('2d');
  const initialBalanceInput = document.getElementById('initialBalance');
  const calculateButton = document.getElementById('calculateBalance');
  const downloadImageButton = document.getElementById('downloadImage');
  const fileInput = document.getElementById('uploadExcel');
  const downloadExcelButton = document.getElementById('downloadExcel');

  // チャートの作成
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['10日', '15日', '20日', '25日', '月末'],
      datasets: [{
        label: '口座残高',
        data: [0, 0, 0, 0, 0],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: '残高'
          },
          ticks: {
            callback: function(value) {
              return Math.floor(value).toLocaleString(); // 小数点以下切り捨て
            }
          }
        }
      }
    }
  });

 function updateCalculations() {
  const initialBalance = Math.floor(parseFloat(initialBalanceInput.value)) || 0;
  let previousBalance = initialBalance;

  const salesInputs = document.querySelectorAll('.input-sales');
  const expensesInputs = document.querySelectorAll('.input-expenses');
  const loanIncomeInputs = document.querySelectorAll('.input-loan-income');
  const loanRepaymentInputs = document.querySelectorAll('.input-loan-repayment');
  const equityInvestmentInputs = document.querySelectorAll('.input-equity-investment');
  const equitySaleInputs = document.querySelectorAll('.input-equity-sale');
  const subsidyInputs = document.querySelectorAll('.input-subsidy');

  const operatingResults = document.querySelectorAll('.result-operating');
  const financialResults = document.querySelectorAll('.result-financial');
  const totalResults = document.querySelectorAll('.result-total');
  const balanceResults = document.querySelectorAll('.result-balance');

  const chartData = [];

  for (let i = 0; i < salesInputs.length; i++) {
    const sales = Math.floor(parseFloat(salesInputs[i].value)) || 0;
    const expenses = Math.floor(parseFloat(expensesInputs[i].value)) || 0;
    const loanIncome = Math.floor(parseFloat(loanIncomeInputs[i].value)) || 0;
    const loanRepayment = Math.floor(parseFloat(loanRepaymentInputs[i].value)) || 0;
    const equityInvestment = Math.floor(parseFloat(equityInvestmentInputs[i].value)) || 0;
    const equitySale = Math.floor(parseFloat(equitySaleInputs[i].value)) || 0;
    const subsidy = Math.floor(parseFloat(subsidyInputs[i].value)) || 0;

    const operatingBalance = sales - expenses;
    const financialBalance = operatingBalance + loanIncome - loanRepayment;
    const totalBalance = financialBalance + equityInvestment - equitySale + subsidy;
    const currentBalance = previousBalance + totalBalance;

    operatingResults[i].textContent = operatingBalance.toLocaleString();
    financialResults[i].textContent = financialBalance.toLocaleString();
    totalResults[i].textContent = totalBalance.toLocaleString();
    balanceResults[i].textContent = currentBalance.toLocaleString();

    chartData.push(currentBalance);
    previousBalance = currentBalance;
  }

  // チャートを更新
  myChart.data.datasets[0].data = chartData;
  myChart.update();
}


  // エクセルファイルアップロード機能
  fileInput.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const sheetData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

        // セルに数値を反映（最初の行はスキップし、各行の最初の列もスキップ）
        for (let i = 1; i < sheetData.length; i++) { // 最初の行をスキップ
          const row = sheetData[i];
          if (row) {
            // i + 1 にすることで、HTMLテーブルの2行目以降（売上着金額行から）に対応
            const inputs = document.querySelectorAll(`.input-table tr:nth-child(${i + 1}) input`);
            for (let j = 1; j < row.length; j++) { // 最初の列をスキップして反映
              const value = parseFloat(row[j]);
              if (inputs[j - 1] && !isNaN(value)) { // j - 1で入力フィールドと正しく対応
                inputs[j - 1].value = Math.floor(value); // 小数点以下切り捨て
              }
            }
          }
        }
        updateCalculations(); // 更新を反映
      };
      reader.readAsArrayBuffer(file);
    }
  });

  // グラフを画像としてダウンロードする機能
  function setCanvasBackground() {
  const canvas = document.getElementById('mychart');
  const ctx = canvas.getContext('2d');

  // 背景色を白で塗りつぶす
  ctx.save();
  ctx.globalCompositeOperation = 'destination-over';
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}

downloadImageButton.addEventListener('click', function () {
  setCanvasBackground(); // 背景色を設定
  const link = document.createElement('a');
  link.download = 'chart-image.png';
  link.href = myChart.toBase64Image();
  link.click();
});

  // 入力イベントを追加してリアルタイムで計算を更新
  const inputs = document.querySelectorAll('.input-table input, #initialBalance');
  inputs.forEach(input => {
    input.addEventListener('input', updateCalculations);

    // Enterキーで次の入力欄に移動する設定
    input.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        const currentRow = input.closest('tr');
        const currentColIndex = Array.from(currentRow.children).indexOf(input.parentElement);
        let nextRow = currentRow.nextElementSibling;

        // 次の行に移動。最後の行だった場合は終了
        while (nextRow && !nextRow.querySelectorAll('input')[currentColIndex]) {
          nextRow = nextRow.nextElementSibling;
        }

        if (nextRow) {
          const nextInput = nextRow.children[currentColIndex]?.querySelector('input');
          if (nextInput) {
            nextInput.value = ''; // 次の入力欄を空にして、値を引き継がないようにする
            nextInput.focus();
          }
        }
      }
    });
  });
});
