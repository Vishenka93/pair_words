import { getHistoryTr } from "./utils.js";

const historyTableBody = document.querySelector(".history-table-body");
const coloredCheckbox = document.querySelector(".history-colored-checkbox");
const dateSelect = document.querySelector(".history-date-select");
const exerciseSelect = document.querySelector(".history-exercise-select");
const resultSelect = document.querySelector(".history-result-select");

const renderTable = (history, colored) => {
    historyTableBody.innerHTML = "";

    history.forEach((row) => {
        const tr = getHistoryTr(row, colored);
        historyTableBody.appendChild(tr);
    });
};

const getExercisesNames = (history) => {
    const dict = {};
    history.forEach(({ exercise }) => {
        dict[exercise] = 1;
    });
    return Object.keys(dict);
};

const checkDate = (option, timestamp) => {
    if (option === "all") {
        return true;
    } else if (option === "month") {
        const today = new Date();
        const date = new Date(timestamp);
        return (
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    } else if (option === "week") {
        return timestamp >= Date.now() - 1000 * 60 * 60 * 24 * 7;
    }
};

const checkResult = (option, result) => {
    const res = result.split("/")[0] / result.split("/")[1];
    if (option === "all") {
        return true;
    } else if (option === "excellent") {
        return res >= 0.8;
    } else if (option === "good") {
        return res >= 0.4 && res < 0.8;
    } else if (option === "bad") {
        return res < 0.4;
    }
};

const getFilteredHistory = (history, fDate, fEx, fRes) => {
    return history.filter(({ timestamp, exercise, result }) => {
        return (
            checkDate(fDate, timestamp) &&
            (fEx === "all" || fEx === exercise) &&
            checkResult(fRes, result)
        );
    });
};

const fillExercisesSelect = (history) => {
    exerciseSelect.innerHTML = "";
    const exercisesList = ["all", ...getExercisesNames(history)];
    exercisesList.forEach((el) => {
        const option = document.createElement("option");
        option.textContent = el;
        option.value = el;
        exerciseSelect.appendChild(option);
    });
};

export const showUserHistory = () => {
    const history = JSON.parse(localStorage.getItem("stats")) || [];
    let rows = history;

    let colored = true;

    let date = "all";
    let exercise = "all";
    let result = "all";

    fillExercisesSelect(history);

    coloredCheckbox.checked = colored;
    coloredCheckbox.onchange = (e) => {
        colored = e.target.checked;
        renderTable(rows, colored);
    };

    dateSelect.onchange = (e) => {
        date = e.target.value;
        rows = getFilteredHistory(history, date, exercise, result);
        renderTable(rows, colored);
    };

    exerciseSelect.onchange = (e) => {
        exercise = e.target.value;
        rows = getFilteredHistory(history, date, exercise, result);
        renderTable(rows, colored);
    };

    resultSelect.onchange = (e) => {
        result = e.target.value;
        rows = getFilteredHistory(history, date, exercise, result);
        renderTable(rows, colored);
    };
    console.log(rows);
    renderTable(rows, colored);
};
