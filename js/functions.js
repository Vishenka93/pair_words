export const storeUserHistory = (name, result, wordMistake) => {
    const history = JSON.parse(localStorage.getItem("history")) || [];
    const userResult = {
        timeStamp: Date.now(),
        name: name,
        stats: result,
        wordMis: wordMistake,
    };
    history.push(userResult);
    localStorage.setItem("history", JSON.stringify(history));
    console.log(userResult);
};
