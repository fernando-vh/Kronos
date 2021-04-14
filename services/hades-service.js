const axios = require('axios');

const createNewSongHades = async (emotion) => {
    return await axios({
        responseType: 'arraybuffer',
        url: process.env.HADES_API,
        method: 'get',
        headers:{'Content-type':'audio/mpeg'},
        data:{emotion}
    })
    .then((res) => ({
        data: res.data
    }))
    .catch((err) => {err});
}

module.exports = {
    createNewSongHades
}