const table = document.querySelector(".history__table-body");
const checkbox = document.querySelector(".checkbox");
const select = document.querySelector("#ex")

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
        const pes = stats.split("/");
        const persant = (pes[0] / pes[1]) * 100;
        const dateStr = getDateStr(timeStamp);

        const getExersices = (name) => {
            history.forEach(({name}) => {
                const res = {}
                if(res[name] === undefined) {
                    res[name] = name
                }

                Object.keys(res).forEach((nameOfExer) => {
                    const option = document.createElement("option")
                    option.textContent = nameOfExer
                    option.value = nameOfExer;
                    select.appendChild(option);
                })
            })
        }
        

        [dateStr, name, stats].forEach((el) => {
            const td = document.createElement("td");
            td.textContent = el;
            td.classList.add("td-class");

            checkbox.addEventListener("change", function () {
                if (checkbox.checked) {
                    if (persant <= 40) {
                        td.classList.add("red");
                    } else if (persant > 40 && persant <= 80) {
                        td.classList.add("yellow");
                    } else {
                        td.classList.add("green");
                    }
                } else {
                    td.classList.remove("red", "green", "yellow");
                }
            });

            tr.appendChild(td);
        });

        table.appendChild(tr);
    });

};
