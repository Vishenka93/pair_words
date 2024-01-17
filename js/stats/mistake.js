import { getDateStr } from "./history.js";

const table = document.querySelector(".mistake__table-body");

export const showUserMistakes = () => {
    const history = JSON.parse(localStorage.getItem("history")) || [];

    history.forEach(({ timeStamp, name, wordMis }) => {
        const tr = document.createElement("tr");
        const dateStr = getDateStr(timeStamp);
        if (wordMis !== undefined) {
            [wordMis, name, dateStr].forEach((el) => {
                const td = document.createElement("td");
                td.textContent = el;
                td.classList.add("td");
                tr.appendChild(td);
            });
        }

        table.appendChild(tr);
    });
};
