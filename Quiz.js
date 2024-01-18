//出題のランダム化
function RANDOM(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const Q = Math.floor(Math.random() * (i + 1));
        [array[i], array[Q]] = [array[Q], array[i]]
    }
    return array;
}

//問題集
const Quiz = [
    {
        question: "ゲーム市場、最も売れたゲームは次の内どれ？",
        answers: [
            "ファミコン",
            "PS2",
            "DS",
            "Switch"],
        correct: "DS"
    },
    {
        question: "Iphoneのホームボタンがなくなったのはいつから？",
        answers: [
            "Iphone12",
            "Iphone7s",
            "Iphone10",
            "Iphone8"],
        correct: "Iphone10"
    },
    {
        question: "2024年現在遡ること10年前のポケモンのゲームタイトルはどれ？",
        answers: [
            "ブラック/ホワイト",
            "オメガルビー/アルファサファイア",
            "ダイヤモンド/パール",
            "X/Y"],
        correct: "オメガルビー/アルファサファイア"
    }
];

RANDOM(Quiz);

const question = document.getElementsByClassName("question")
const BUTTON = document.getElementsByClassName("qz-txt");
const QuizLength = Quiz.length;
let QuizIndex = 0;
let score = 0;

setupQuiz();

//HTMLの取得と反映
function setupQuiz() {
    document.getElementById("question-number").innerText = "問題" + (QuizIndex + 1);

    document.querySelector(".question").innerText = Quiz[QuizIndex].question;

    for (let btnIndex = 0; btnIndex < BUTTON.length; btnIndex++) {
        BUTTON[btnIndex].textContent = Quiz[QuizIndex].answers[btnIndex];
        BUTTON[btnIndex].addEventListener("click", checkAnswer)
    }
};

//正誤判定
function checkAnswer(e) {
    const selectAnswer = e.target.textContent;
    //クリックした要素が <button>Click Me</button> だった場合、
    //e.target は <button> 要素そのものを指し、e.target.textContent は "Click Me" を返します。
    if (selectAnswer === Quiz[QuizIndex].correct) {
        window.alert("正解!");
        score++;
    } else {
        window.alert("不正解!");
    }
    QuizIndex++;
    //結果表示
    if (QuizIndex < QuizLength) {
        setupQuiz();
    } else {
        window.alert("終了!あなたの正解数は" + score + "/" + QuizLength + "です!")
    }
};