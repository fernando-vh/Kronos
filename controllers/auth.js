const bcrypt = require('bcryptjs');

const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require('../helpers/verify-external-token');

const User = require("../models/dbModels/user");
const types = require('../models/types/types');

//FOR SOME FUCKING REASON, sequelize WORKS RANDOMLY, SO I NEED TO USE 'toJSON()' or 'raw:true'
const loginInternal = async (req, res) => {
    try{

        const {password, email} = req.body;

        const user = await User.findOne({ where: { email }, raw:true } );

        if(!user || user.archived || !bcrypt.compareSync(password, user.password)){
            return res.status(400).json({msg: 'No valid email or password'});
        }
        
        const {id, username, role_id} = user;
        const token = await generateJWT({id, username, role_id});

        return res.status(200).json({
            msg:'success',
            token
        })

    }catch(e){
        console.log(e);
        return res.status(500).json({msg:'Something went wrong'});
    }
}

const sigInInternal = async (req, res) => {
    try{

        const {username, email, description, private_email} = req.body;
        let {password} = req.body;

        password = bcrypt.hashSync(password, bcrypt.genSaltSync());
    
        const user = await User.create(
            {username, email, password, description, private_email}
        );

        const {password:ignore, ...rest} = user.toJSON();
    
        return res.status(201).json({
            msg:'success',
            user: rest
        });
        
    }catch(e){
        console.log(e);
        return res.status(500).json({msg:'Something went wrong'});
    }
}

const signInGoogle = async (req, res) =>{
    try{
        const googletoken = req.header('authorization').split(' ')[1];
        
        const googleUser = await googleVerify(googletoken);
        const {email, username, pp_path} = googleUser

        let user = await User.findOne( { where: { email } } );

        if(!user){
            user = new User.create({ username, email, pp_path, auth_type_id:types.AUTH_TYPE.GOOGLE });
            user = user.toJSON();
        }

        if(user.archived) return res.status(401);
        
        const {id, role_id} = user;
        const token = await generateJWT({id, username, role_id});

        return res.status(200).json({
            msg:'success',
            token
        })

    }catch(e){
        console.log(e);
        return res.status(401).json();
    }
    
}

const checkTokenIntegrity = (req, res) => {
    try{
        return res.status(200).json({
            msg:'success',
            user:req.user
        })
    }catch{
        console.log(e);
        return res.status(500).json({msg:'Something went wrong'})
    }
}

module.exports = {
    loginInternal,
    sigInInternal,
    signInGoogle,
    checkTokenIntegrity
}