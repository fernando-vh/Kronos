const AuthType = require("../models/dbModels/auth-types");
const Emotion = require("../models/dbModels/emotion");
const Role = require("../models/dbModels/role");
const Song = require("../models/dbModels/song");
const User = require("../models/dbModels/user");
const types = require("../models/types/types");

const { obj2StringPretty } = require("./util");

const emailExists = async (email) => {
    const user = await User.findOne({
        where:{
            email
        }
    })

    if(user){
        throw new Error('Email already register!');
    }
}

const songExists = async (songId) => {
    const song = await Song.findByPk(songId);

    if(!song){
        throw new Error("Song doesn't exists!");
    }
}

const validateRole = async (role=types.ROLE.USER_ROLE) => {
    const roleExists = await Role.findByPk(role);

    if(!roleExists){
        throw new Error(`Role does not exist! use one of the follow: ${obj2StringPretty(types.ROLE)}`);
    }
}

const validateAuthType = async (authT=types.AUTH_TYPE.INTERNAL) => {
    const authExists = await AuthType.findByPk(authT);

    if(!authExists){
        throw new Error(`Auth type does not exist! use one of the follow: ${obj2StringPretty(types.AUTH_TYPE)}`);
    }
}

const validateEmotionCode = async (emotion=types.EMOTION.SAD) => {
    const emotionExist = await Emotion.findByPk(emotion)

    if(!emotionExist){
        throw new Error(`Emotion code does not exists! use one of the follow: ${obj2StringPretty(types.EMOTION)}`)
    }
}

const userExistsIncludeArchieve = async(uid)=>{
    const user = await User.findByPk(uid);
    if(!user){
        throw new Error('No valid user ID');
    }
}

const userExists = async(uid)=>{
    const user = await User.findByPk(uid, {raw:true});
    if(!user || user.archived){
        throw new Error('No valid user ID');
    }
}

module.exports = {
    emailExists,
    validateRole,
    validateAuthType,
    validateEmotionCode,
    userExists,
    songExists,
    userExistsIncludeArchieve
}