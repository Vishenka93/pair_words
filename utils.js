export const storeResult = (exercisefullName, score, quantity) => {
    const resultForStats = {
        timestamp: Date.now(),
        exercise: exercisefullName,
        result: `${score}/${quantity}`,
    };
    const history = JSON.parse(localStorage.getItem("stats")) || [];
    history.push(resultForStats);
    localStorage.setItem("stats", JSON.stringify(history));
};

const getDateStr = (ts) => {
    const date = new Date(ts);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${day < 10 ? "0" + day : day}.${
        month < 10 ? "0" + month : month
    }.${year}`;
};

export const getHistoryTr = ({ timestamp, exercise, result }) => {
    const tr = document.createElement("tr");
    tr.classList.add("history-row");
    const dateStr = getDateStr(timestamp);
    [dateStr, exercise, result].forEach((el) => {
        const td = document.createElement("td");
        td.textContent = el;
        td.classList.add("history-table-cell");
        tr.appendChild(td);
        return td;
    });
    return tr;
};
