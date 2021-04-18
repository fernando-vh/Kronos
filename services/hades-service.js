const axios = require('axios');
const { randomInt } = require('crypto');

const fs = require('fs');
const types = require('../models/types/types');

const createNewSongHades = async (emotion) => {
    
    let folder;
    
    switch(emotion){
        case types.EMOTION.HAPPY:   folder = 'HAPPY'; break;
        case types.EMOTION.ALARMED:   folder = 'ALARMED'; break;
        case types.EMOTION.SAD:   folder = 'SAD'; break;
        case types.EMOTION.TIRED:   folder = 'TIRED'; break;
    }
    
    const testFolder = `C:/Users/HavyM/Music/Musica Varia/${folder}`;

    const files = fs.readdirSync(testFolder);
    const songs = files.filter(v => v.includes(".mp3"));
    const selectedSong = songs[randomInt(0, songs.length)];
    const songFile = fs.readFileSync(`${testFolder}/${selectedSong}`);

    return {
        data:songFile
    }
    
    /* THIS IS THE REQUEST TO HADES
    
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
    
    */
}

module.exports = {
    createNewSongHades
}