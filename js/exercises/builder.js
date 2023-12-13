const currentQuestionBoard = document.querySelector(
    ".builder__current-question"
);
const result = document.querySelector(".builder__result");
const resultScore = document.querySelector(".builder__result-score");
const content = document.querySelector(".builder__content");
const restartBtn = document.querySelector(".builder__restart");

const translation = document.querySelector(".builder__translation");
const greenCardsWrapper = document.querySelector(".builder__green-cards");
const blackCardsWrapper = document.querySelector(".builder__black-cards");

const quantity = 5; // set quantity of word pairs for exercise

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const wordBuilderExercise = (pairs) => {
    content.style.display = "block";
    result.style.display = "none";

    const selected = shuffleArray(pairs).slice(0, quantity);

    let currentQuestion = 0;
    let score = 0;

    let shuffledLetters = [];
    let translatedWord = "";
    let originalWord = "";

    let progress = "";
    let mistakes = 0;
    let currentLetterIndex = 0;
    let chosenLettersIndexes = [];
    let lettersQuantity = 0;

    showWords(currentQuestion);
    restartBtn.onclick = () => {
        wordBuilderExercise(pairs);
    };

    function showWords(i) {
        translatedWord = selected[i]["ukWord"];
        originalWord = selected[i]["enWord"];
        currentQuestionBoard.textContent = `current question: ${
            i + 1
        } / ${quantity}`;
        translation.textContent = translatedWord;
        shuffledLetters = shuffleArray(originalWord.split(""));
        lettersQuantity = originalWord.length;

        buildWord();
    }

    function buildWord() {
        greenCardsWrapper.innerHTML = "";
        blackCardsWrapper.innerHTML = "";
        for (let i = 0; i < lettersQuantity; i++) {
            const green = document.createElement("div");
            green.classList.add("greenCard");

            if (progress[i] !== undefined) {
                green.textContent = progress[i];
            }
            greenCardsWrapper.appendChild(green);

            if (!chosenLettersIndexes.includes(i)) {
                const black = document.createElement("div");
                black.classList.add("blackCard");

                black.textContent = shuffledLetters[i];
                black.dataset.letter = shuffledLetters[i];
                black.dataset.index = i;
                black.onclick = handleBlackCardClick;
                blackCardsWrapper.appendChild(black);
            }
        }
    }

    function handleBlackCardClick(e) {
        if (originalWord.startsWith(progress + e.target.dataset.letter)) {
            progress += e.target.dataset.letter;
            chosenLettersIndexes.push(+e.target.dataset.index);
            currentLetterIndex += 1;
            if (currentLetterIndex < lettersQuantity) {
                buildWord();
            } else {
                currentQuestion++;
                if (currentQuestion < quantity) {
                    goToNextWord();
                    showWords(currentQuestion);
                } else {
                    finish();
                }
            }
        } else {
            mistakes += 1;
            if (mistakes > 2) {
                finish(
                    `You did 3 mistakes on word pair: ${translatedWord} - ${originalWord}.`
                );
            }
        }
    }

    function goToNextWord() {
        progress = "";
        mistakes = 0;
        currentLetterIndex = 0;
        chosenLettersIndexes = [];
        lettersQuantity = 0;
    }

    function finish(mistakeMessage) {
        content.style.display = "none";
        result.style.display = "block";
        resultScore.textContent = `your result: ${score} / ${quantity}${
            mistakeMessage ? ". " + mistakeMessage : ""
        }`;
    }
};
