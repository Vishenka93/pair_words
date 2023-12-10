
const currentQuestionShow = document.querySelector(
    ".builder__current-question"
);
const word = document.querySelector(".builder__word")
const correctLetter = document.querySelector(".correct-letters")
const randomLetter = document.querySelector(".random-letters")
const result = document.querySelector(".builder__result");
const resultScore = document.querySelector(".builder__score");
const content = document.querySelector(".builder");
const restartBtn = document.querySelector(".builder__restart");

let quantity = 5;
export const wordBuilder = (pairs) => {
    const selected = pairs.sort(() => 0.5 - Math.random()).slice(0, quantity); // тут взяли 10 слов из общего количества в словаре

    let currentQuestion = 0; // номер текущего вопроса, начиная с 0
    let score = 0; //количество правильных ответов

    content.style.display = "block";
    result.style.display = "none";

    const showWords = (i) => {
        //отрисовка номера вопроса и пары слов, перевод зависет от рандома или монетки
        const en = selected[i]["enWord"]
        const uk = selected[i]["ukWord"];
        
        word.textContent = uk;
        let quantityMistake = 0

        const letters = en.split("").sort(() => 0.5 - Math.random())
        letters.forEach((letter) => {
            const divGreen = document.createElement("div")
            correctLetter.appendChild(divGreen)

            const divBlack = document.createElement("div")
            divBlack.textContent = letter
        })
        

        currentQuestionShow.textContent = `current question: ${
            i + 1
        } / ${quantity}`; //номер вопроса начиная с 1
    };

    const handleAnswer = (answer, i) => {
        //обработка ответа юзера
        const correctAnswer = selected[i]["ukWord"] === randomUk; //задумка вопроса, правильный ответ
        if (answer === correctAnswer) {
            score += 1;
        }
    };

    const finish = () => {
        content.style.display = "none";
        result.style.display = "block";
        resultScore.textContent = `your result: ${score} / ${quantity}`;
    };

    btns.forEach(([btn, answer]) => {
        btn.onclick = () => {
            handleAnswer(answer, currentQuestion);
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
    wordBuilder(pairs)
};
// 10 вынети в конст и сделать функционал для изменени кол-ва слов
