import { getDateStr } from "./history.js";

const table = document.querySelector(".mistake__table-body");

export const showUserMistakes = () => {
    const mistake = JSON.parse(localStorage.getItem("mistake")) || [];
    table.innerHTML = "";
    mistake.forEach(({ timeStamp, name, wordMistake }) => {
        const tr = document.createElement("tr");
        const dateStr = getDateStr(timeStamp);

        [wordMistake, name, dateStr].forEach((el) => {
            const td = document.createElement("td");
            td.textContent = el;
            td.classList.add("td");
            tr.appendChild(td);
        });

        table.appendChild(tr);
    });
};
