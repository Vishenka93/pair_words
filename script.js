const inputUk = document.querySelector(".wrapper__input_uk");
const inputEn = document.querySelector(".wrapper__input_en");
const btn = document.querySelector(".button-wrapper__button");
const items = document.querySelector(".wrapper__item");

const pairs = [];

const pair = {
    ukWord: "",
    enWord: "",
};

btn.disabled = true;

const displayPairs = () => {
    items.innerHTML = "";
    pairs.forEach(({ enWord, ukWord }) => {
        const p = document.createElement("p");
        p.textContent = `${ukWord} - ${enWord}`;
        items.appendChild(p);
    });
};

inputUk.oninput = (e) => {
    pair["ukWord"] = e.target.value;
    btn.disabled = Object.values(pair).some((str) => str === "");
};

inputEn.oninput = (e) => {
    pair["enWord"] = e.target.value;
    btn.disabled = Object.values(pair).some((str) => str === "");
};

btn.onclick = () => {
    pairs.push({ ...pair });

    pair["ukWord"] = "";
    pair["enWord"] = "";

    inputUk.value = "";
    inputEn.value = "";
    btn.disabled = true;
    displayPairs();
};
