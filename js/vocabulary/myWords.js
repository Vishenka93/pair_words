import { checkHasDublicate } from "../functions.js";
const inputUk = document.querySelector(".wrapper__input_uk");
const inputEn = document.querySelector(".wrapper__input_en");
const btn = document.querySelector(".button-wrapper__button");
const items = document.querySelector(".wrapper__item");
const messageDublicate = document.querySelector(".dublicate");
const popup = document.querySelector(".popup");
const popupButtonYes = document.querySelector(".popup__button-yes");
const popupButtonCancel = document.querySelector(".popup__button-cancel");
const popupQuestion = document.querySelector(".popup__question");

const defoultWords = [
    { id: 0, enWord: "book", ukWord: "книга" },
    { id: 1, enWord: "table", ukWord: "стол" },
    { id: 2, enWord: "chair", ukWord: "стул" },
    { id: 3, enWord: "car", ukWord: "автомобиль" },
    { id: 4, enWord: "dog", ukWord: "собака" },
    { id: 5, enWord: "cat", ukWord: "кот" },
    { id: 6, enWord: "house", ukWord: "дом" },
    { id: 7, enWord: "tree", ukWord: "дерево" },
    { id: 8, enWord: "sun", ukWord: "солнце" },
    { id: 9, enWord: "moon", ukWord: "луна" },
    { id: 10, enWord: "man", ukWord: "мужчина" },
    { id: 11, enWord: "woman", ukWord: "женщина" },
    { id: 12, enWord: "child", ukWord: "ребенок" },
    { id: 13, enWord: "day", ukWord: "день" },
    { id: 14, enWord: "night", ukWord: "ночь" },
    { id: 15, enWord: "door", ukWord: "дверь" },
    { id: 16, enWord: "window", ukWord: "окно" },
    { id: 17, enWord: "computer", ukWord: "компьютер" },
    { id: 18, enWord: "phone", ukWord: "телефон" },
    { id: 19, enWord: "friend", ukWord: "друг" },
];

export const myWords = (pairs) => {
    let pair = {
        id: null,
        ukWord: "",
        enWord: "",
    };

    let isEdit = false;

    localStorage.setItem("words", JSON.stringify(defoultWords));
    const displayPairs = () => {
        items.innerHTML = "";
        pairs.forEach(({ enWord, ukWord, id }) => {
            const div = document.createElement("div");
            div.style.height = "80px";
            div.style.display = "flex";
            div.style.marginBottom = "20px";

            const blockWords = document.createElement("div");
            blockWords.style.flex = "80%";
            blockWords.style.display = "flex";
            blockWords.style.alignItems = "center";

            const blockBtns = document.createElement("div");
            blockBtns.style.flex = "20%";
            blockBtns.style.display = "flex";
            blockBtns.style.alignItems = "center";

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "delete";
            deleteBtn.classList.add("delete", "blue");

            const editBtn = document.createElement("button");
            editBtn.style.marginRight = "10px";
            editBtn.textContent = "edit";
            editBtn.classList.add("delete", "blue");

            if (pairs.length <= 20) {
                deleteBtn.disabled;
            } else if (pairs.length > 20) {
                deleteBtn.onclick = () => {
                    popup.style.display = "flex";
                    document.body.classList.add("notscroll");
                    popupQuestion.textContent = `Are you sure you want to delete word-pair ${enWord}-${ukWord}?`;
                    popupButtonYes.onclick = () => {
                        document.body.classList.remove("notscroll");
                        pairs = pairs.filter((pair) => pair.id !== id);
                        localStorage.setItem("words", JSON.stringify(pairs));
                        popup.style.display = "none";
                        displayPairs();
                    };
                    popupButtonCancel.onclick = () => {
                        document.body.classList.remove("notscroll");
                        popup.style.display = "none";
                    };
                };
            }

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

            const ukWor = document.createElement("div");
            ukWor.style.flex = "40%";
            const enWor = document.createElement("div");
            enWor.style.flex = "40%";
            const between = document.createElement("p");
            between.style.flex = "20%";

            ukWor.textContent = `${ukWord}`;
            enWor.textContent = `${enWord}`;
            between.textContent = "-";

            blockWords.appendChild(ukWor);
            blockWords.appendChild(between);
            blockWords.appendChild(enWor);
            blockBtns.appendChild(editBtn);
            blockBtns.appendChild(deleteBtn);
            div.appendChild(blockWords);
            div.appendChild(blockBtns);
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
            const isDublicate = checkHasDublicate(pair);
            if (isDublicate) {
                messageDublicate.textContent = `Word ${pair["enWord"]} already exists in your vocabulary!`;
                messageDublicate.style.display = "block";

                setTimeout(function () {
                    messageDublicate.style.display = "none";
                }, 5000);
            } else {
                pairs.push({ ...pair, id: pairs.length });
                messageDublicate.style.display = "none";
            }
        }
        localStorage.setItem("words", JSON.stringify(pairs));

        inputUk.value = "";
        inputEn.value = "";
        btn.style.display = "none";
        displayPairs();
    };

    displayPairs();
    btn.style.display = "none";
};
