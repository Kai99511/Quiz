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

// HTMLの取得
const question = document.querySelector(".question");
const BUTTON = document.getElementsByClassName("qz-txt");
const progressBar = document.getElementById("progress-bar");

//クイズの定義
const QuizLength = Quiz.length;
let QuizIndex = 0;
let score = 0;

//プログレスバー定義
let timeLimit = 10;
let currentTime = timeLimit;
let intervalId;

setupQuiz();
updateProgressBar(); // ページ読み込み時にプログレスバーを開始

// 問題文の処理
function setupQuiz() {
    document.getElementById("question-number").innerText = "問題" + (QuizIndex + 1);
    question.innerText = Quiz[QuizIndex].question;

    for (let btnIndex = 0; btnIndex < BUTTON.length; btnIndex++) {
        BUTTON[btnIndex].textContent = Quiz[QuizIndex].answers[btnIndex];
        BUTTON[btnIndex].addEventListener("click", checkAnswer);
        BUTTON[btnIndex].disabled = false; // ボタンを有効に戻す
    }
}

// 制限時間ごとにプログレスバーを更新
function updateProgressBar() {
    clearInterval(intervalId);
    //プログレスバーのアニメーション
    const progressPercentage = (currentTime / timeLimit) * 100;
    progressBar.style.width = `${progressPercentage}%`;

    if (currentTime > 0) {
        currentTime--;
        intervalId = setTimeout(updateProgressBar, 1000);
    } else {
        setTimeout(() => {
            window.alert("時間切れ！不正解!");
            QuizIndex++;
            if (QuizIndex < QuizLength) {
                setupQuiz();
                currentTime = timeLimit; // 次の問題に進むと同時に時間をリセット
                updateProgressBar();
            } else {
                window.alert("終了! あなたの正解数は" + score + "/" + QuizLength + "です!");
                disableButtons(); // ボタンを無効化
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
        score++;
    } else {
        window.alert("不正解!");
    }

    QuizIndex++;
    // 結果表示
    if (QuizIndex < QuizLength) {
        setupQuiz();
        currentTime = timeLimit; // 次の問題に進むと同時に時間をリセット
        updateProgressBar();
    } else {
        window.alert("終了! あなたの正解数は" + score + "/" + QuizLength + "です!");
        disableButtons(); // ボタンを無効化
        clearInterval(intervalId); // ゲージを停止
    }
}

// ボタンを無効化する関数
function disableButtons() {
    for (let btnIndex = 0; btnIndex < BUTTON.length; btnIndex++) {
        BUTTON[btnIndex].removeEventListener("click", checkAnswer);
        BUTTON[btnIndex].disabled = true;
    }
}
