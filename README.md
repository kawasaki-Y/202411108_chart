# ①課題番号-プロダクト名

- 課題番号：3 　じゃんけんアプリの応用　「5日単位の資金繰り計画」

## ②課題内容（どんな作品か）

- キャッシュインとキャッシュアウトの数値を入力して、5日単位で口座残高を可視化するものです。口座残高がマイナスになりそうであれば、資金繰りが回らなくなるということになります。




## ③DEMO

なし

## ④作ったアプリケーション用のIDまたはPasswordがある場合

なし

## ⑤工夫した点・こだわった点

- tableで作成した資金繰り表のロジックは次の通りです。
・前回口座残高（前回の口座残高が反映される）
・売上着金額 - 経常支出額 = 経常収支 
・経常収支 ＋ 借入収入 - 借入返済 ＝ 財務収支
・財務収支 ＋ 株式出資金 - 株式売却 ＋ 補助金 ＝ 収支合計
・前回口座残高 ＋ 収支合計 ＝ 口座残高
- 口座残高のグラフ化にはchart.jsを使っています。（https://www.chartjs.org/）このグラフは、画像としてダウンロードできるようにしました。
- 数値入力は手入力できますが、自分で使ってみたら面倒くさかったので、Excelで数値をアップロードできる仕様にしました。



## ⑥難しかった点・次回トライしたいこと(又は機能)

- 難しかった点としては、細かい設定が必要としたことです。
❶口座残高の反映
・10日の口座残高は、15日の前回口座残高に反映される
・15日の口座残高は、20日の前回口座残高に反映される
・20日の口座残高は、25日の前回口座残高に反映される
・25日の口座残高は、月末の前回口座残高に反映される
❷表記ルールの設定（手入力の場合）
・「経常収支」は売上着金額と経常支出額が両方入力された時に表記される
・「財務収支」は借入収入額と借入返済額が両方入力された時に表記される
❸端数処理
・表とグラフの数値表記は千円未満四捨五入表記で設定。
❹ユーザビリティ
・enter押したら下のセルに行く設定。設定しないと入力後enterで次にいかないことが判明した。
❺桁区切り
・数値は3桁区切り表記
❻ファイルアップロード
・エクセルをアップロードしたら、セルに数値が反映される
❼行と列の当てはめ
・エクセルでアップしたセルの数値とアプリの入力フォーム同士が対応しないという事態に陥り試行錯誤した

- 次回トライしたいこと
・資金繰り表は最低でも半年間単位で確認したいので、半年間が可視化できる内容にしたいです
・どの項目もそうですが、特に経常支出額は細分化すると、多くの変数の集まりのため、分解した数値を再集計できる様な計算ロジックを組みたいです。
・今回はグラフの種類を「line」（折れ線グラフ）としたが、余力があれば「bar」（棒グラフ）や「pie」（円グラフ）なども自由選択できる様にしたいです。

## ⑦質問・疑問・感想、シェアしたいこと等なんでも

- [質問]
・本当は今回作ったものとは違うものを提出予定でした。最初はopenAIのAPIを活用したチャット形式コーチングアプリを作っていたのですが、githubにプッシュするとエラーが発生してしまいアップロードができずに断念しました。ググるとAPIを組み込んだコードをgithubにアップすると、リスクがあるため弾かれたのではないか？とのことです。知らない誰かにAPIのトークンを使われて残高が消耗してしまう恐れがあるかららしいみたいです。APIを活用した場合の、安全なプッシュの仕方があるならば知りたいと思いました。

・今回提出のものは、自分自身が使っているsample.1 pngとsample.2 pngで示す資金繰り計画書を、html・css・jsで再現できるか？がテーマでした。こう考えると、Excelやスプシで管理できるものを、webに直すメリットは何なのだろうか？と疑問に思いました。

・READMEには、まだ書ききれないことがあったので、提出時間が迫っているので一旦提出後に書き加えると思います。

以下、JSのコードのメモ

ブロック❶

「document.addEventListener("DOMContentLoaded", function () {」
・ウェブページが完全に表示されたら、この中のコードを動かすよ、という合図。
・これがないと、ページがまだ途中で読み込まれているときにコードが動いてエラーになることがある 

 「const ctx = document.getElementById('mychart').getContext('2d');」
・変数 ctx は、後のコードで Chart.js によってグラフを描画する際に使用/ 
・document.getElementById('mychart') は、IDが mychart の < canvas > 要素を取得する 
・getContext('2d')はChart.js などのライブラリを使ってグラフを描画する

「const initialBalanceInput = document.getElementById('initialBalance');」
 ・initialBalance の <input> 要素を取得し、変数 initialBalanceInput に格納する。それ以降のコードも意味は同じ。
 ・初期の口座残高の入力を受け取るために使用する。
 ・入力欄に数値を入力すると、スクリプトがその数値を使用して計算を行う/
 
 「const calculateButton = document.getElementById('calculateBalance');」
  ・ IDが calculateBalance のボタン要素を取得し、変数 calculateButton に格納する
  ・このボタンは、ユーザーがクリックすると計算を実行するために使用される
  ・後でクリックイベントを登録し、ボタンを押したときに計算を実行する処理を追加できる/ 

　「const downloadImageButton = document.getElementById('downloadImage');」
  ・IDが downloadImage のボタン要素を取得し、変数 downloadImageButton に格納する。
  ・生成されたグラフを画像としてダウンロードするために使用
  ・この要素を取得することで、後でクリックイベントを登録し、ボタンが押されたときにグラフを画像として保存する処理を追加できる/ 

  「const fileInput = document.getElementById('uploadExcel');」
  ・IDが uploadExcel の <input>（タイプが file）要素を取得し、変数 fileInput に格納する
  ・ユーザーがExcelファイルをアップロードするために使用
  ・ファイルがアップロードされると、そのデータを読み込んでテーブルに反映するために使用される。/ 
  
  「const downloadExcelButton = document.getElementById('downloadExcel');」
  ・IDが downloadExcel のボタン要素を取得し、変数 downloadExcelButton に格納する
  ・計算されたデータをExcelファイルとしてダウンロードするために使用する
  ・後にクリックイベントを登録することで、ボタンを押したときにその機能を実行する

  ・これらの変数を定義することで、後続のコードでそれぞれの要素にイベントリスナーを追加したり、操作したりすることが容易になる。


ブロック❷
ウェブページのキャンバスに、「口座残高」を示す折れ線グラフを描くためのスペースを作っている。見た目やデータの設定を細かく調整できる。

1. const myChart = new Chart(ctx, { ... });
・ constを使って、変数「myChart」に新しいグラフを作って入れている。
・ctxを使って、キャンバスにグラフを描くよ、という設定をしている。ブロック❶で「const ctx = document.getElementById('mychart').getContext('2d');」をしているので、キャンバスでmychartを拾ってくる。
2. type: 'line',
・ここでグラフの種類を「line」にして、折れ線グラフを表記している。他にも「bar」（棒グラフ）や「pie」（円グラフ）なども選べる。余力があれば、自由選択できる様にしたいものである。
3. data: { ... }
・ここでグラフのデータ（どんな情報を表示するか）を設定している。
3.1 labels: ['10日', '15日', '20日', '25日', '月末'],
・X軸のラベルを設定している。これは日付を目盛りとして設定している。この入力値がグラフの横軸に表示される。
・5日単位の資金繰りということで、10日、15日、20日、25日、月末の値を使っている。
3.2 datasets: [{ ... }]
・グラフに表示されるデータのグループを設定している。
・X軸、Y軸といった複数のデータセットを追加して、異なる２つの情報を1つのグラフに載せることができる。
3.2.1 label: '口座残高',
・グラフのデータの名前をつけるのに使用した。この名前はグラフの凡例として表示されており、今回は「口座残高」とした。
3.2.2 data: [0, 0, 0, 0, 0],
・実際にグラフに描かれる数字の初期値に使用している。テーブルで示した各日付に対応する口座残高数値が入る。
・今はすべて0ですが、口座残高が変動すれば動かして変わる。
3.2.3 backgroundColor: 'rgba(75, 192, 192, 0.2)',
・折れ線のドットに薄く色をつけるための色設定をしている。「rgba(75, 192, 192, 0.2)」は、薄い緑色の半透明な色である。
3.2.4 borderColor: 'rgba(75, 192, 192, 1)',
・グラフの線の色を濃い緑色に設定している。
3.2.5 borderWidth: 2,
意味: グラフの線の幅を2ピクセルで設定している。
4. options: { ... }
・optionsで括ることで、グラフの詳細を設定する。どんな見た目にするか、どんな動きをするかなどを、ここで決めた。
4.1 responsive: true,
・レスポンシブ対応で、グラフが画面サイズに応じて大きさを自動変更する設定にしている。
4.2 scales: { ... }
・X軸やY軸の設定を行う。
4.2.1 y: { ... }
・その中でもY軸の設定をした。見た目や動作を決めている。
4.2.1.1 beginAtZero: false,
・計算の結果、銀行残高がマイナスになった場合の表記を考えて、Y軸が0から始まらないように設定している。
4.2.1.2 title: { display: true, text: '残高' },
・Y軸のタイトルを表示し、「残高」と書くように設定している。
4.2.1.3 ticks: { callback: function(value) { ... } }
・Y軸の目盛りに数字を表示する際のルールを決めている。
callback: function(value):の関数を使って、数字が表示される前に少し加工する設定を行っている。この関数では、「Math.floor(value).toLocaleString()」を使って、数値を小数点以下を切り捨てて（floor(value)）、カンマ区切りの形式で表示（toLocaleString）するようにしている（例えば1000は「1,000」と表示）。

ブロック❸
function updateCalculations() {の関数を使って、最初の口座残高から始めて、売上や経費など2則演算して、最終的な口座残高を計算している。

1. const initialBalance = Math.floor(parseFloat(initialBalanceInput.value)) || 0;
・最初に入力された「初期の残高」を読み取って、それを数値として取り出しいる。ここを設定しないと、JSは計算プロセスで必要な初期残高を認識してくれない。
・parseFloatで入力を数字に変換する。ここで文字列を入れたとしても、数字に変換される。
・Math.floor: 数字の小数点以下を切り捨てて計算する。口座残高が小数点以下になることはないが、端数切り上げを統一ルールとした。
・|| 0: もし入力が空っぽだったり数字に変換できなかった場合、残高は「0」になることとした。記号とか、数字と関係ない情報が入ったらエラーの原因になるため。
2. let previousBalance = initialBalance;
・「previousBalance」という名前の変数に初期残高を引数として代入している。
・この変数を設定することで初期残高を変更する都度、口座残高も更新される。
3. const salesInputs = document.querySelectorAll('.input-sales');
・ページ内の「売上」の入力欄を全部まとめて探して、「salesInputs」という名前のリストに変換する。
同じ意味のコード:
expensesInputs: 経費の入力欄を探す。
loanIncomeInputs: ローン収入の入力欄を探す。
loanRepaymentInputs: ローン返済の入力欄を探す。
equityInvestmentInputs: 資本投資の入力欄を探す。
equitySaleInputs: 資本売却の入力欄を探す。
subsidyInputs: 補助金の入力欄を探す。
4. const operatingResults = document.querySelectorAll('.result-operating');
・計算結果を表示する場所を探してリストにしている。ここで指定する変数は入力値ではなく、入力値に応じた結果のみを表記する場所である。計算後に結果を見せる場所をJSに教えてあげている。
同じ意味のコード:
financialResults: 財務の結果を表示する場所。
totalResults: 合計の結果を表示する場所。
balanceResults: 最終残高を表示する場所。
5. const chartData = [];
意味: 空のリスト「chartData」を作っている。これは後でグラフに表示するためのデータを入れるためである。

ブロック❹
ここからは売上、支出、借入収入、借入返済、株式投資、株式売却、補助金といった財務データを入力して、経常収支、財務収支、収支合計、口座残高を計算⇨それをテーブルとグラフに同時反映している

「for (let i = 0; i < salesInputs.length; i++) {」
salesInputs.length の数だけ繰り返し処理を行っている。
これは、テーブルの列（ 月ごとのデータ）ごとに計算を行うためである

「const sales = Math.floor(parseFloat(salesInputs[i].value)) || 0;」
「const expenses = Math.floor(parseFloat(expensesInputs[i].value)) || 0;」
各入力欄の値を parseFloat() で数値に変換し、小数点以下を Math.floor() で切り捨てている。
もし値が NaN（無効な数値）の場合、|| 0 により 0 を代入する。
sales は売上額、expenses は経常支出額である。


for (let i = 0; i < salesInputs.length; i++) {
salesInputs.length の数だけ繰り返し処理を行います。テーブルの列ごとに計算を行うために設定した。

const sales = Math.floor(parseFloat(salesInputs[i].value)) || 0;
const expenses = Math.floor(parseFloat(expensesInputs[i].value)) || 0;
const loanIncome = Math.floor(parseFloat(loanIncomeInputs[i].value)) || 0;
const loanRepayment = Math.floor(parseFloat(loanRepaymentInputs[i].value)) || 0;
const equityInvestment = Math.floor(parseFloat(equityInvestmentInputs[i].value)) || 0;
const equitySale = Math.floor(parseFloat(equitySaleInputs[i].value)) || 0;
const subsidy = Math.floor(parseFloat(subsidyInputs[i].value)) || 0;
各入力欄の値を parseFloat() で数値に変換し、小数点以下を Math.floor() で切り捨てている。
もし値が NaN（無効な数値）の場合、|| 0 により 0 を代入している。


const operatingBalance = sales - expenses;
operatingBalance は、売上から経常支出を引いた結果（経常収支）です。

const financialBalance = operatingBalance + loanIncome - loanRepayment;
financialBalance は、経常収支に借入収入を加え、借入返済を引いた結果（財務収支）です。

const totalBalance = financialBalance + equityInvestment - equitySale + subsidy;
totalBalance は、財務収支に株式出資金を加え、株式売却額を引き、さらに補助金を加えた結果（収支合計）です。

const currentBalance = previousBalance + totalBalance;
currentBalance は、前回の口座残高に収支合計を加えた結果です。このループが繰り返されることで、各期間の口座残高が更新されます。

operatingResults[i].textContent = operatingBalance.toLocaleString();
financialResults[i].textContent = financialBalance.toLocaleString();
totalResults[i].textContent = totalBalance.toLocaleString();
balanceResults[i].textContent = currentBalance.toLocaleString();
計算結果をテーブルの該当セルに表示します。toLocaleString() によって、数値がカンマ区切りで表示されます。

chartData.push(currentBalance);
previousBalance = currentBalance;
chartData 配列に currentBalance を追加し、次のループ用に previousBalance を現在の残高に更新します。

このコードは、入力データを基に各計算を行い、結果をテーブルに反映し、グラフを更新するためのものです。それぞれの計算は累積して次の期間に影響するように設計されています。

ブロック❺
1. チャートの更新
myChart.data.datasets[0].data = chartData;
myChart.update();
ここで、chartData配列がmyChart（Chart.jsを代入した変数）に新しいデータとして適用され、myChart.update()でグラフが再描画される
2. エクセルファイルアップロード機能
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
fileInput要素のchangeイベントをリッスンし、エクセルファイルがアップロードされたときに処理を行っている。
FileReaderを使用してファイルを読み込み、XLSXライブラリを使ってエクセルデータを解析している。
取得したデータをテーブルの各入力欄に反映している。最初の行と最初の列はスキップされるように設定している。
入力欄にデータが反映された後、updateCalculations()で計算とグラフの更新が行う仕様としている。
3. グラフを画像としてダウンロードする機能

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
setCanvasBackground()関数で、キャンバスの背景色を白に設定し、真っ黒な画像が生成されないようにしている。これを設定しないと、背景が黒い状態でDLされてしまった。
downloadImageButtonのclickイベントで、この関数を実行して背景色を設定した後、グラフをPNG画像としてダウンロードする。

4. 入力イベントでリアルタイム計算

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
.input-table内のすべてのinput要素と#initialBalanceにinputイベントを追加し、入力があったときにupdateCalculations()を呼び出してリアルタイムで計算結果を更新している。
keydownイベントでは、Enterキーが押されたときに、次の入力欄へフォーカスを移動します。値を引き継がないように次の入力欄を空にし、ユーザーが新しい値を入力できるようにしているが、deploy時はうまくいっていたが、今はうまくいってない気もしている。
