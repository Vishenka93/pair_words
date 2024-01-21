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

export const mistakeUserHistory = (name, pairMistake) => {
    const mistake = JSON.parse(localStorage.getItem("mistake")) || [];
    if (!mistake.some(({ wordMistake }) => wordMistake === pairMistake)) {
        const userResult = {
            timeStamp: Date.now(),
            name: name,
            wordMistake: pairMistake,
        };
        mistake.push(userResult);
        localStorage.setItem("mistake", JSON.stringify(mistake));
    }
};

export const removeMistakeUserHistory = (answer) => {
    const mistake = JSON.parse(localStorage.getItem("mistake")) || [];

    const remove = mistake.filter(({ wordMistake }) => wordMistake !== answer);
    localStorage.setItem("mistake", JSON.stringify(remove));
};

export const checkHasDublicate = (pair) => {
    const storagePairs = localStorage.getItem("words");
    let pairs = storagePairs === null ? [] : JSON.parse(storagePairs);
    const word = pair.enWord;
    console.log(pair);

    return pairs.some(({ enWord }) => enWord === word);
};
