import { exirciseTrueOrFalse } from "./trueOfFalse.js";
import { exsiciseQuiz } from "./quiz.js";

const inputUk = document.querySelector(".wrapper__input_uk");
const inputEn = document.querySelector(".wrapper__input_en");
const btn = document.querySelector(".button-wrapper__button");
const items = document.querySelector(".wrapper__item");
const toolbarBtnWords = document.querySelector(".toolbar__words");
const toolbarBtnTrueOrFalse = document.querySelector(
    ".exercises__true-of-false"
);
const toolbarBtnQuizEn = document.querySelector(".exercises__quiz-en");
const toolbarBtnQuizUk = document.querySelector(".exercises__quiz-uk");
const contentWords = document.querySelector(".wrapper-content");
const contentTrueOrFalse = document.querySelector(".true-or-false-content");
const contentQuiz = document.querySelector(".quiz");
const storagePairs = localStorage.getItem("words");
let pairs = storagePairs === null ? [] : JSON.parse(storagePairs);

const defaultTabName = "words";

const toolbarBtns = [
    toolbarBtnWords,
    toolbarBtnTrueOrFalse,
    toolbarBtnQuizEn,
    toolbarBtnQuizUk,
];
const toolbarContents = [contentWords, contentTrueOrFalse, contentQuiz];

let pair = {
    id: null,
    ukWord: "",
    enWord: "",
};

let isEdit = false;

const displayPairs = () => {
    items.innerHTML = "";
    pairs.forEach(({ enWord, ukWord, id }) => {
        const div = document.createElement("div");
        div.classList.add("pair-word");

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "delete";
        deleteBtn.classList.add("delete");
        const editBtn = document.createElement("button");
        editBtn.textContent = "edit";
        editBtn.classList.add("delete");

        deleteBtn.onclick = () => {
            pairs = pairs.filter((pair) => pair.id !== id);

            localStorage.setItem("words", JSON.stringify(pairs));
            displayPairs();
        };

        editBtn.onclick = () => {
            btn.textContent = "SAVE CHANGES";
            inputUk.value = ukWord;
            inputEn.value = enWord;
            isEdit = true;
            pair = {
                enWord,
                ukWord,
                id,
            };
        };

        const p = document.createElement("p");
        p.textContent = `${ukWord} - ${enWord}`;

        div.appendChild(p);
        div.appendChild(editBtn);
        div.appendChild(deleteBtn);
        items.appendChild(div);
    });
};

inputUk.oninput = (e) => {
    pair["ukWord"] = e.target.value;
    btn.style.display = Object.values(pair).some((str) => str === "")
        ? "none"
        : "block";
};

inputEn.oninput = (e) => {
    pair["enWord"] = e.target.value;
    btn.style.display = Object.values(pair).some((str) => str === "")
        ? "none"
        : "block";
};

btn.onclick = () => {
    if (isEdit) {
        pairs = pairs.map((p) => (p.id === pair["id"] ? { ...pair } : p));
        isEdit = false;
        btn.textContent = "ADD WORD PAIR";
    } else {
        pairs.push({ ...pair, id: pairs.length });
    }
    localStorage.setItem("words", JSON.stringify(pairs));

    inputUk.value = "";
    inputEn.value = "";
    displayPairs();
};

displayPairs();

const handleClickTab = (tabName) => {
    toolbarContents.forEach((content) => {
        content.style.display =
            content.dataset.name === tabName ? "block" : "none";
    });
    toolbarBtns.forEach((button) => {
        if (button.dataset.name === tabName) {
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
        console.log(tabName, lang);
        handleClickTab(tabName, lang);
        if (tabName === "true-or-false") {
            exirciseTrueOrFalse(pairs);
        } else if (tabName === "quiz" && lang === "en") {
            exsiciseQuiz(pairs, "en");
        } else if (tabName === "quiz" && lang === "uk") {
            exsiciseQuiz(pairs, "uk");
        }
    };
});

btn.style.display = "none";
handleClickTab(defaultTabName);
