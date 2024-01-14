export const storeUserHistory = (name, result) => {
    const history = JSON.parse(localStorage.getItem("history")) || [];
    const userResult = {
        timeStamp: Date.now(),
        name: name,
        stats: result,
    };
    history.push(userResult);
    localStorage.setItem("history", JSON.stringify(history));
    console.log("dada");
};

export const checkHasDublicate = (pair) => {
    const storagePairs = localStorage.getItem("words");
    let pairs = storagePairs === null ? [] : JSON.parse(storagePairs);
    const word = pair.enWord;
    console.log(pair);

    return pairs.some(({ enWord }) => enWord === word);
};
