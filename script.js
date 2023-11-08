const inputUk = document.querySelector(".wrapper__input_uk");
const inputEn = document.querySelector(".wrapper__input_en");
const btn = document.querySelector(".button-wrapper__button");
const items = document.querySelector(".wrapper__item");

const storagePairs = localStorage.getItem("words");
let pairs = storagePairs === null ? [] : JSON.parse(storagePairs);

const pair = {
    id: null,
    ukWord: "",
    enWord: "",
};

btn.disabled = true;

const displayPairs = () => {
    items.innerHTML = "";
    pairs.forEach(({ enWord, ukWord, id }) => {
        const div = document.createElement("div");
        div.classList.add("pair-word");

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "delete";
        deleteBtn.onclick = () => {
            pairs = pairs.filter((pair) => pair.id !== id);

            localStorage.setItem("words", JSON.stringify(pairs));
            displayPairs();
        };

        const p = document.createElement("p");
        p.textContent = `${ukWord} - ${enWord}`;

        div.appendChild(p);
        div.appendChild(deleteBtn);
        items.appendChild(div);
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
    pairs.push({ ...pair, id: pairs.length });
    localStorage.setItem("words", JSON.stringify(pairs));

    pair["ukWord"] = "";
    pair["enWord"] = "";

    inputUk.value = "";
    inputEn.value = "";
    btn.disabled = true;
    displayPairs();
    console.log(pairs);
};

displayPairs();
