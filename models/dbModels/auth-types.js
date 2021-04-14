const { DataTypes } = require('sequelize');
const db = require('../../db/connection');

const AuthType = db.define('Auth_type', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    auth_type:{
        type:DataTypes.STRING
    }
},{
    timestamps:false
})

module.exports = AuthType;