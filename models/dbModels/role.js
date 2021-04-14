const { DataTypes } = require('sequelize');
const db = require('../../db/connection');

const Role = db.define('Role', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    role_type:{
        type:DataTypes.STRING
    }
},{
    timestamps:false
})

module.exports = Role;