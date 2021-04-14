const { DataTypes } = require('sequelize');
const db = require('../../db/connection');

const Song = db.define('Song', {
    id:{
        type:DataTypes.STRING,
        primaryKey:true
    },
    title:{
        type:DataTypes.STRING
    },
    duration:{
        type:DataTypes.STRING
    },
    size:{
        type:DataTypes.STRING 
    },
    user_id:{
        type:DataTypes.INTEGER,
    },
    emotion_code:{
        type:DataTypes.TINYINT,
    }
})

module.exports = Song;