const path = require('path');
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');

const { uploadFile, uploadBinFile, extractMP3Data } = require('../helpers/file-operations');
const { validatePermission } = require('../helpers/validate-permission');
const User = require('../models/dbModels/user');
const types = require('../models/types/types');
const { createNewSongHades } = require('../services/hades-service');
const Song = require('../models/dbModels/song');
const {getRandomInt} = require('../helpers/util');


const loadUserImage = async (req, res) => {
    try{

        const {userId:id} = req.params;

        if(!validatePermission(types.PERMISSION_TYPE.BOTH, req.user, id)){
            return res.status(401).json();
        }

        const {res:fileName} = await uploadFile(req.files, ['jpg', 'png', 'jpeg'], types.FILE_DIRS.PP_DIRNAME);

        const user = await User.scope('no_sensitive_email').findByPk(id);

        if(user.pp_path && user.pp_path !== types.DEFAULT_VALUES.DEFAULT_IMG){
            const imagePath = path.join(types.FILE_DIRS.PP_DIRNAME, user.pp_path);
            if(fs.existsSync(imagePath)){
                fs.unlinkSync(imagePath);
            }
        }
        await user.update({pp_path: fileName});

    
        return res.status(201).json({
            msg:'success',
            user
        })

    }catch(e){
        console.log(e);
        if(e.status){ //This is because uploadFile function throws an error for io exceptions
            return res.status(e.status).json({msg:e.res});
        }

        return res.status(500).json({msg:'Something went wrong'});
    }
}

const loadSong = async (req, res) => {
    try{

        const {emotionCode, title} = req.body;

        const resp = await createNewSongHades(emotionCode);
        const {res:fileName} = await uploadBinFile(resp.data, 'mp3', types.FILE_DIRS.SONGS_DIRNAME);
        const {duration, size} = await extractMP3Data(types.FILE_DIRS.SONGS_DIRNAME+"/"+fileName);

        const t = title || 'Song ' + getRandomInt(10000000, 99999999);
        const song = await Song.create(
            {  
                id: fileName.split('.')[0],
                title: t,
                duration,
                size,
                user_id: req.user.id,
                emotion_code: emotionCode
            }
        );

        return res.status(201).json({
            msg:'success',
            song
        });

    }catch(e){
        console.log(e);
        if(e.status){ //This is because uploadFile function throws an error for io exceptions
            return res.status(e.status).json({msg:e.res});
        }

        return res.status(500).json({msg:'Something went wrong'});
    }
}

const deleteSong = async (req, res) => {
    try{
        const {id:songId} = req.params;
    
        const song = await Song.findByPk(songId);

        if(!validatePermission(types.PERMISSION_TYPE.BOTH, req.user, song.user_id)){
            return res.status(401).json();
        }

        song.destroy();
        const songPath = types.FILE_DIRS.SONGS_DIRNAME+'/'+songId+'.mp3'; 

        if(fs.existsSync(songPath)){
            fs.unlinkSync(songPath);
        }

        return res.status(200).json({
            msg:'success',
            songId
        })

    }catch(e){
        console.log(e);
        return res.status(500).json({msg:'Something went wrong'});
    }
}

const getUserImage = async (req, res) => {
    const {userId:id} = req.params;

    try{
        const user = await User.findByPk(id);
        const filePath = path.join(types.FILE_DIRS.PP_DIRNAME, user.pp_path);

        return res.status(200).sendFile(filePath);

    }catch(e){
        console.log(e);
        return res.status(500).json({msg:'Something went wrong'});
    }

}

const getSongFile = async (req, res) => {
    try{
        const {id} = req.params;

        const filePath = path.join(types.FILE_DIRS.SONGS_DIRNAME, id+".mp3");

        return res.status(200).sendFile(filePath);

    }catch(e){
        console.log(e);
        return res.status(500).json({msg:'Something went wrong'});
    }
}

const copySong = async (req, res) => {
    try{

        const {id} = req.params;

        const fileName = uuidv4() + '.mp3';

        fs.copyFileSync(
            `${types.FILE_DIRS.SONGS_DIRNAME}/${id}.mp3`,
            `${types.FILE_DIRS.SONGS_DIRNAME}/${fileName}`);

        const song = await Song.findByPk(id);

        const copySong = await Song.create(
            {  
                id: fileName.split('.')[0],
                title: song.title,
                duration: song.duration,
                size: song.size,
                user_id: req.user.id,
                emotion_code: song.emotion_code
            }
        );

        return res.status(201).json({
            msg:'success',
            copySong
        });

    }catch(e){
        console.log(e);
        return res.status(500).json({msg:'Something went wrong'});
    }
}

module.exports = {
    loadUserImage,
    getUserImage,
    loadSong,
    deleteSong,
    getSongFile,
    copySong
}