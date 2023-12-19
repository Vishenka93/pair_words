const table = document.querySelector(".history__table-body");
const checkbox = document.querySelector(".checkbox")




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
        const pes = stats.split("/")
        const persant = pes[0] / pes[1] * 100
        // console.log(stats.split("/").join(""))
        const dateStr = getDateStr(timeStamp);
        [dateStr, name, stats].forEach((el) => {
            const td = document.createElement("td");
            td.textContent = el;
            if(persant <= 40) {
                td.classList.add("td-class", "red")
            } else if (persant > 40 && persant <= 80){
                td.classList.add("td-class", "yellow")
            } else {
                td.classList.add("td-class", "green") 
            }
            tr.appendChild(td);
        });

        table.appendChild(tr);
    });
};
