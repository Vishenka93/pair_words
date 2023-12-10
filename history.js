import { getHistoryTr } from "./utils.js";

const historyTableBody = document.querySelector(".history-table-body");

export const showUserHistory = () => {
    historyTableBody.innerHTML = "";
    const stats = JSON.parse(localStorage.getItem("stats"));
    stats.forEach((row) => {
        const tr = getHistoryTr(row);
        historyTableBody.appendChild(tr);
    });
};
