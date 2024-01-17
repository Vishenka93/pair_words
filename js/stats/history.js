const table = document.querySelector(".history__table-body");
let checkColor = document.querySelector(".checkbox");
const selectDate = document.querySelector(".select__date");
const selectNameOfEx = document.querySelector(".select__name-ex");
const selectResult = document.querySelector(".select__result");

const history = JSON.parse(localStorage.getItem("history")) || [];
let filtered = [...history];
let selectDateValue = "All";
let selectExValue = "All";
let selectResultValue = "All";
checkColor.checked = true;

const getDateStr = (time) => {
    const t = new Date(time);
    const day = t.getDate();
    const month = t.getMonth();
    const year = t.getFullYear();
    const res = `${day < 10 ? `0${day}` : day}.${
        month + 1 < 10 ? `0${month + 1}` : month + 1
    }.${year}`;
    return res;
};

const getExNames = (items) => {
    const unic = {};
    items.forEach(({ name }) => {
        if (unic[name] === undefined) {
            unic[name] = name;
        }
    });
    return Object.keys(unic);
};

const renderHistory = (tableItems) => {
    table.innerHTML = "";

    tableItems.forEach(({ timeStamp, name, stats }) => {
        const tr = document.createElement("tr");

        const dateStr = getDateStr(timeStamp);
        [dateStr, name, stats].forEach((el) => {
            const td = document.createElement("td");
            td.classList.add("td");
            const proc = getProc(stats);
            if (checkColor.checked === true) {
                if (proc < 40) {
                    td.classList.add("bad");
                } else if (proc > 40 && proc < 80) {
                    td.classList.add("good");
                } else if (proc === 100) {
                    td.classList.add("excellent");
                }
            }

            td.textContent = el;
            tr.appendChild(td);
        });

        table.appendChild(tr);
    });
};

const checkDate = (timeStamp, option) => {
    const today = new Date();

    const date = new Date(timeStamp);

    if (option === "month") {
        return today.getMonth() === date.getMonth();
    } else if (option === "week") {
        return date.getTime() >= today.getTime() - 24 * 60 * 60 * 1000;
    }
};

const getProc = (stats) => {
    const res = stats.split("/");
    const done = +res[0];
    const quantity = +res[1];
    return (done / quantity) * 100;
};

const chooseResult = (stats, option) => {
    const proc = getProc(stats);
    if (option === "bad") {
        return proc < 40;
    } else if (option === "good") {
        return proc > 40 && proc < 80;
    } else if (option === "excellent") {
        return proc === 100;
    }
};

const filterHistory = () => {
    filtered = history.filter(
        ({ name, stats, timeStamp }) =>
            (selectExValue === "All" || name === selectExValue) &&
            (selectDateValue === "All" ||
                checkDate(timeStamp, selectDateValue)) &&
            (selectResultValue === "All" ||
                chooseResult(stats, selectResultValue))
    );
};

const fillExSelect = (items) => {
    items.forEach((item) => {
        const option = document.createElement("option");
        option.textContent = item;
        selectNameOfEx.appendChild(option);
    });
};

export const showUserHistory = () => {
    renderHistory(filtered);
    const exNamse = getExNames(filtered);
    fillExSelect(exNamse);

    selectDate.onchange = (e) => {
        selectDateValue = e.target.value;
        filterHistory();
        renderHistory(filtered);
    };
    selectNameOfEx.onchange = (e) => {
        selectExValue = e.target.value;
        filterHistory();
        renderHistory(filtered);
    };
    selectResult.onchange = (e) => {
        selectResultValue = e.target.value;
        filterHistory();
        renderHistory(filtered);
    };
    checkColor.onchange = (e) => {
        checkColor.checked = e.target.checked;
        renderHistory(filtered);
    };
};
