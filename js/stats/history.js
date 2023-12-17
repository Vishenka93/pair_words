const table = document.querySelector(".history__table-body");

const getDateStr = (time) => {
    const t = new Date(time);
    const day = t.getDate();
    const month = t.getMonth();
    const year = t.getFullYear();
    const res = `${day}.${month}.${year}`;
    return res;
};

export const showUserHistory = () => {
    table.innerHTML = "";
    const history = JSON.parse(localStorage.getItem("history")) || [];

    history.forEach(({ timeStamp, name, stats }) => {
        const tr = document.createElement("tr");

        const dateStr = getDateStr(timeStamp);
        [dateStr, name, stats].forEach((el) => {
            const td = document.createElement("td");
            td.textContent = el;
            tr.appendChild(td);
        });

        table.appendChild(tr);
    });
};
