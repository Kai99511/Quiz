//定義
let QuizLength;
let QuizIndex;
let score;
let timeLimit;
let currentTime;
let intervalId;

function startGame() {
    // タイトル画面を非表示にし、ゲーム画面を表示
    document.getElementById('title-screen').style.display = 'none';
    document.querySelector('.quiz').style.display = 'block';

    // 出題のランダム化
    function RANDOM(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const Q = Math.floor(Math.random() * (i + 1));
            [array[i], array[Q]] = [array[Q], array[i]];
        }
        return array;
    }

    // 問題集
    const Quiz = [
        {
            question: "ゲーム市場、最も売れたゲームは次の内どれ？",
            answers: ["ファミコン", "PS2", "DS", "Switch"],
            correct: "DS"
        },
        {
            question: "Iphoneのホームボタンがなくなったのはいつから？",
            answers: ["Iphone12", "Iphone7s", "Iphone10", "Iphone8"],
            correct: "Iphone10"
        },
        {
            question: "2024年現在遡ること10年前のポケモンのゲームタイトルはどれ？",
            answers: ["ブラック/ホワイト", "オメガルビー/アルファサファイア", "ダイヤモンド/パール", "X/Y"],
            correct: "オメガルビー/アルファサファイア"
        }
    ];

    // 出題をランダム化
    RANDOM(Quiz);

    // HTMLの取得、表示
    const question = document.querySelector(".question");
    question.style.display = 'block';

    const BUTTON = document.getElementsByClassName("qz-txt");
    BUTTON[0].style.display = 'block';

    const progressBar = document.getElementById("progress-bar");
    progressBar.style.display = 'block';

    //クイズの定義
    QuizLength = Quiz.length;
    QuizIndex = 0;
    score = 0;

    //プログレスバー定義
    timeLimit = 10;
    currentTime = timeLimit;
    intervalId;

    setupQuiz();
    updateProgressBar(); // ページ読み込み時にプログレスバーを開始

    // 問題文の処理
    function setupQuiz() {
        document.getElementById("question-number").innerText = "問題" + (QuizIndex + 1);
        question.innerText = Quiz[QuizIndex].question;//問題数の表示

        for (let btnIndex = 0; btnIndex < BUTTON.length; btnIndex++) {
            BUTTON[btnIndex].textContent = Quiz[QuizIndex].answers[btnIndex];
            BUTTON[btnIndex].addEventListener("click", checkAnswer);//クリックイベント
            BUTTON[btnIndex].disabled = false; // ボタンを有効に戻す
        }
    }

    // 制限時間ごとにプログレスバーを更新
    function updateProgressBar() {
        clearInterval(intervalId);
        //プログレスバーのアニメーション
        const progressPercentage = (currentTime / timeLimit) * 100;
        progressBar.style.width = `${progressPercentage}%`;

        //現在時間が0以上なら現象する
        if (currentTime > 0) {
            currentTime--;
            intervalId = setTimeout(updateProgressBar, 1000);

        } else {
            setTimeout(() => {
                window.alert("時間切れ！不正解!");
                QuizIndex++;
                //QuizIndexよりQuizLength多いなら問題の更新・ゲージのリセット
                if (QuizIndex < QuizLength) {
                    setupQuiz();
                    currentTime = timeLimit; // 次の問題に進むと同時に時間をリセット
                    updateProgressBar();
                    //問題がない場合endGame(終了)する
                } else {
                    endGame(score);
                    disableButtons();// ボタンを無効化
                    clearInterval(intervalId); // ゲージを停止
                }
            }, 1000);
        }
    }

    // 正誤判定
    function checkAnswer(e) {
        const selectAnswer = e.target.textContent;

        if (selectAnswer === Quiz[QuizIndex].correct) {
            window.alert("正解!");
            score++;//点数加算
        } else {
            window.alert("不正解!");
        }
        QuizIndex++;//問題数加算
        // 結果表示
        if (QuizIndex < QuizLength) {
            setupQuiz();
            currentTime = timeLimit; // 次の問題に進むと同時に時間をリセット
            updateProgressBar();
        } else {
            endGame(score);
            disableButtons();// ボタンを無効化
            clearInterval(intervalId); // ゲージを停止
        }
    }

    // ボタンを無効化する関数
    function disableButtons() {
        for (let btnIndex = 0; btnIndex < BUTTON.length; btnIndex++) {
            BUTTON[btnIndex].removeEventListener("click", checkAnswer);
            BUTTON[btnIndex].disabled = true;//無効化
        }
    }
}

//問題が終わったら終了
function endGame(score) {
    const resultMessage = `終了！あなたの正解数は${score}/${QuizLength}です！`;//リザルト
    document.getElementById('title-screen').style.display = 'block';//リザルト画面を表示
    document.getElementById('title-screen').innerHTML = `<h2>${resultMessage}</h2>`;//点数
    document.getElementById('title-screen').innerHTML += '<button onclick="restartGame()">もう一度プレイ</button>';//リスタートボタン
    document.querySelector('.quiz').style.display = 'none';//ゲーム画面の非表示
    currentTime = timeLimit;//ゲージのリセット
    QuizIndex = 0;//
    score = 0;//点数リセット
}

//リザルト&リスタート
function restartGame() {
    document.getElementById('title-screen').style.display = 'none'; //リザルト画面(タイトル画面)を非表示
    startGame(); // ゲームを再開する
}