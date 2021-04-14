const obj2StringPretty = (obj) => {
    return JSON.stringify(obj).replace(/\"/g, " ");
}

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
    obj2StringPretty,
    getRandomInt
}