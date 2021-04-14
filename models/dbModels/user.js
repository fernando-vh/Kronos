const { DataTypes } = require('sequelize');
const db = require('../../db/connection');
const types = require('../types/types');

const User = db.define('User', {
    username:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING 
    },
    archived:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    description:{
        type:DataTypes.STRING,
        defaultValue:""
    },
    pp_path:{
        type:DataTypes.STRING,
        defaultValue: types.DEFAULT_VALUES.DEFAULT_IMG
    },
    private_email:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    role_id:{
        type:DataTypes.INTEGER,
        defaultValue:types.ROLE.USER_ROLE
    },
    auth_type_id:{
        type:DataTypes.INTEGER,
        defaultValue:types.AUTH_TYPE.INTERNAL
    }
},{
    scopes: {
        no_sensitive: {
          attributes: { exclude: ['password'] }
        },
        no_sensitive_email: {
            attributes: { exclude: ['password', 'email'] }
        },
      }
})

module.exports = User;