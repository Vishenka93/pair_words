import { exirciseTrueOrFalse } from "./exercises/trueOfFalse.js";
import { exsiciseQuiz } from "./exercises/quiz.js";
import { myWords } from "./vocabulary/myWords.js";
import { showUserHistory } from "./stats/history.js";
import { showUserMistakes } from "./stats/mistake.js";
import { defaultWords } from "./vocabulary/defaultWords.js";

const toolbarBtnWords = document.querySelector(".toolbar__words");
const toolbarBtnTrueOrFalse = document.querySelector(
    ".exercises__true-of-false"
);
const toolbarBtnQuizEn = document.querySelector(".exercises__quiz-en");
const toolbarBtnQuizUk = document.querySelector(".exercises__quiz-uk");
const toolbarBtnHistory = document.querySelector(".stats__button");
const toolbarBtnMistake = document.querySelector(".stats__mistake");

const contentWords = document.querySelector(".wrapper-content");
const contentTrueOrFalse = document.querySelector(".true-or-false-content");
const contentQuiz = document.querySelector(".quiz");
const contentHistory = document.querySelector(".content__history");
const contentMistake = document.querySelector(".content__mistake");

if (localStorage.getItem("words") === null) {
    localStorage.setItem("words", JSON.stringify(defaultWords));
}
const storagePairs = localStorage.getItem("words");
let pairs = storagePairs === null ? [] : JSON.parse(storagePairs);

const toolbarBtns = [
    toolbarBtnWords,
    toolbarBtnTrueOrFalse,
    toolbarBtnQuizEn,
    toolbarBtnQuizUk,
    toolbarBtnHistory,
    toolbarBtnMistake,
];
const toolbarContents = [
    contentWords,
    contentTrueOrFalse,
    contentQuiz,
    contentHistory,
    contentMistake,
];

const handleClickTab = (tabName, lang) => {
    toolbarContents.forEach((content) => {
        content.style.display =
            content.dataset.name === tabName ? "block" : "none";
    });
    toolbarBtns.forEach((button) => {
        if (button.dataset.name === tabName && button.dataset.lang === lang) {
            button.classList.add("selected-tab");
        } else {
            button.classList.remove("selected-tab");
        }
    });
};
toolbarBtns.forEach((btn) => {
    btn.onclick = (e) => {
        const tabName = e.target.dataset.name;
        const lang = e.target.dataset.lang;
        handleClickTab(tabName, lang);
        if (tabName === "true-or-false") {
            exirciseTrueOrFalse(pairs, "true or false");
        } else if (tabName === "quiz" && lang === "en") {
            exsiciseQuiz(pairs, "en", "word-translation");
        } else if (tabName === "quiz" && lang === "uk") {
            exsiciseQuiz(pairs, "uk", "translation - word");
        } else if (tabName === "words") {
            myWords(pairs);
        } else if (tabName === "history") {
            showUserHistory();
        } else if (tabName === "mistake") {
            showUserMistakes();
        }
    };
});

toolbarBtnWords.click();
