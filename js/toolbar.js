import { exirciseTrueOrFalse } from "./exercises/trueOfFalse.js";
import { exsiciseQuiz } from "./exercises/quiz.js";
import { myWords } from "./vocabulary/myWords.js";
import { wordBuilder } from "./exercises/builder.js";

const toolbarBtnWords = document.querySelector(".toolbar__words");
const toolbarBtnTrueOrFalse = document.querySelector(
    ".exercises__true-of-false"
);
const toolbarBtnQuizEn = document.querySelector(".exercises__quiz-en");
const toolbarBtnQuizUk = document.querySelector(".exercises__quiz-uk");
const toolbarBuild = document.querySelector(".exercise__builder")

const contentWords = document.querySelector(".wrapper-content");
const contentTrueOrFalse = document.querySelector(".true-or-false-content");
const contentQuiz = document.querySelector(".quiz");
const contentBuild = document.querySelector(".builder")

const storagePairs = localStorage.getItem("words");
let pairs = storagePairs === null ? [] : JSON.parse(storagePairs);


const toolbarBtns = [
    toolbarBtnWords,
    toolbarBtnTrueOrFalse,
    toolbarBtnQuizEn,
    toolbarBtnQuizUk,
    toolbarBuild,
];
const toolbarContents = [contentWords, contentTrueOrFalse, contentQuiz, contentBuild];



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
            exirciseTrueOrFalse(pairs);
        } else if (tabName === "quiz" && lang === "en") {
            exsiciseQuiz(pairs, "en");
        } else if (tabName === "quiz" && lang === "uk") {
            exsiciseQuiz(pairs, "uk");
        } else if(tabName === "words") {
            myWords(pairs)
        } else if(tabName === "builder") {
            wordBuilder(pairs)
        }
    };
});


toolbarBtnWords.click()

