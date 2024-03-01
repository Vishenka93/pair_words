import { storeUserHistory } from "../functions.js";
import { mistakeUserHistory } from "../functions.js";

const item = document.querySelector(".quiz__item");
const currentQuestionShow = document.querySelector(".quiz__question");

const result = document.querySelector(".quiz__result");
const resultScore = document.querySelector(".quiz__result-score");
const content = document.querySelector(".quiz__content");
const restartBtn = document.querySelector(".quiz__restart");
const answerBtns = document.querySelectorAll(".quiz__button");

let quantity = 10;
export const exsiciseQuiz = (pairs, lang, name) => {
    const sourceLang = lang === "en" ? "enWord" : "ukWord";
    const targetLang = lang === "en" ? "ukWord" : "enWord";
    const selected = pairs.sort(() => 0.5 - Math.random()).slice(0, quantity);

    let currentQuestion = 0;
    let score = 0;

    content.style.display = "block";
    result.style.display = "none";

    const showWords = (i) => {
        const answers = pairs
            .filter(({ id }) => id !== selected[i]["id"])
            .sort(() => 0.5 - Math.random())
            .slice(0, 3)
            .map((pair) => {
                return pair[targetLang];
            });
        answers.push(selected[i][targetLang]);
        answers.sort(() => 0.5 - Math.random());
        answerBtns.forEach((btn, idx) => {
            btn.textContent = answers[idx];
            btn.dataset.value = answers[idx];
        });
        const en = selected[i][sourceLang];

        item.textContent = en;

        currentQuestionShow.textContent = `current question: ${
            i + 1
        } / ${quantity}`;
    };

    const handleAnswer = (answer, i, lang) => {
        if (answer === selected[i][lang]) {
            score += 1;
        } else {
            mistakeUserHistory(name, selected[i]["enWord"]);
        }
    };

    const finish = () => {
        content.style.display = "none";
        result.style.display = "block";
        resultScore.textContent = `your result: ${score} / ${quantity}`;

        storeUserHistory(name, `${score} / ${quantity}`);
    };

    answerBtns.forEach((btn) => {
        btn.onclick = (e) => {
            const value = e.target.dataset.value;
            handleAnswer(value, currentQuestion, targetLang);
            currentQuestion++;
            if (currentQuestion < quantity) {
                showWords(currentQuestion);
            } else {
                finish();
            }
        };
    });

    showWords(currentQuestion);
    restartBtn.onclick = () => {
        exsiciseQuiz(pairs, lang);
    };
};
