const { DataTypes } = require('sequelize');
const db = require('../../db/connection');

const Emotion = db.define('Emotion', {
    name:{
        type:DataTypes.STRING,
    },
    code:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
},{
    timestamps:false
})

module.exports = Emotion;