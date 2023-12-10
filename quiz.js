import { storeResult } from "./utils.js";

const item = document.querySelector(".quiz__item");
const currentQuestionShow = document.querySelector(".quiz__question");

const result = document.querySelector(".quiz__result");
const resultScore = document.querySelector(".quiz__result-score");
const content = document.querySelector(".quiz__content");
const restartBtn = document.querySelector(".quiz__restart");
const answerBtns = document.querySelectorAll(".quiz__button");
// пары слов
const storagePairs = localStorage.getItem("words");
let pairs = storagePairs === null ? [] : JSON.parse(storagePairs);
let quantity = 12;
export const exsiciseQuiz = (pairs, exercisefullName) => {
    const selected = pairs.sort(() => 0.5 - Math.random()).slice(0, quantity); // тут взяли 10 слов из общего количества в словаре
    console.log({ exercisefullName });
    let currentQuestion = 0; // номер текущего вопроса, начиная с 0
    let score = 0; //количество правильных ответов

    content.style.display = "block";
    result.style.display = "none";

    const showWords = (i) => {
        //отрисовка номера вопроса и пары слов, перевод зависет от рандома или монетки

        const answers = pairs
            .filter(({ id }) => id !== selected[i]["id"])
            .sort(() => 0.5 - Math.random())
            .slice(0, 3)
            .map(({ ukWord }) => ukWord);
        answers.push(selected[i]["ukWord"]);
        answers.sort(() => 0.5 - Math.random());
        answerBtns.forEach((btn, idx) => {
            btn.textContent = answers[idx];
            btn.dataset.value = answers[idx];
        });

        const en = selected[i]["enWord"];
        item.textContent = en;

        currentQuestionShow.textContent = `current question: ${
            i + 1
        } / ${quantity}`; //номер вопроса начиная с 1
    };

    const handleAnswer = (answer, i) => {
        if (answer === selected[i]["ukWord"]) {
            score += 1;
        }
    };

    const finish = () => {
        content.style.display = "none";
        result.style.display = "block";
        resultScore.textContent = `your result: ${score} / ${quantity}`;

        storeResult(exercisefullName, score, quantity);
    };

    answerBtns.forEach((btn) => {
        btn.onclick = (e) => {
            const value = e.target.dataset.value;
            handleAnswer(value, currentQuestion);
            currentQuestion++;
            if (currentQuestion < quantity) {
                showWords(currentQuestion);
            } else {
                finish();
            }
        };
    });

    showWords(currentQuestion); //отрисовка первого вопроса при загрузке нашей игры
};

restartBtn.onclick = () => {
    exsiciseQuiz(pairs);
};
// 10 вынети в конст и сделать функционал для изменени кол-ва слов
