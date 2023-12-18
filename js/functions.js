export const storeUserHistory = (name, result) => {
    const history = JSON.parse(localStorage.getItem("history")) || [];
    const userResult = {
        timeStamp: Date.now(),
        name: name,
        stats: result,
    };
    history.push(userResult);
    localStorage.setItem("history", JSON.stringify(history));
};
