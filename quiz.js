const item = document.querySelector(".quiz__item");
const currentQuestionShow = document.querySelector(".quiz__question");

const result = document.querySelector(".quiz__result");
const resultScore = document.querySelector(".quiz__result-score");
const content = document.querySelector(".quiz__content");
// const restartBtn = document.querySelector(".quiz__restart");
const answerBtns = document.querySelectorAll(".quiz__button");
// пары слов
// const storagePairs = localStorage.getItem("words");
// let pairs = storagePairs === null ? [] : JSON.parse(storagePairs);
let quantity = 12;
export const exsiciseQuiz = (pairs, lang) => {
    const sourceLang = lang === "en" ? "enWord" : "ukWord";
    const targetLang = lang === "en" ? "ukWord" : "enWord";
    // console.log(sourceLang, targetLang);
    const selected = pairs.sort(() => 0.5 - Math.random()).slice(0, quantity); // тут взяли 10 слов из общего количества в словаре

    let currentQuestion = 0; // номер текущего вопроса, начиная с 0
    let score = 0; //количество правильных ответов

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
        console.log(answers);
        const en = selected[i][sourceLang];

        item.textContent = en;

        currentQuestionShow.textContent = `current question: ${
            i + 1
        } / ${quantity}`;
    };

    const handleAnswer = (answer, i, lang) => {
        if (answer === selected[i][lang]) {
            score += 1;
        }
    };

    const finish = () => {
        content.style.display = "none";
        result.style.display = "block";
        resultScore.textContent = `your result: ${score} / ${quantity}`;
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

    showWords(currentQuestion); //отрисовка первого вопроса при загрузке нашей игры
};

// restartBtn.onclick = () => {
//     exsiciseQuiz(pairs, lang);
// };
// 10 вынети в конст и сделать функционал для изменени кол-ва слов
