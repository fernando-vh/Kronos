const bcrypt = require('bcryptjs');

const { validateOrderBy } = require("../helpers/validate-query");
const User = require("../models/dbModels/user");
const { validatePermission } = require("../helpers/validate-permission");
const types = require("../models/types/types");

const getUser = async (req, res) => {
    try{

        const {id} = req.params;
        const user = await User.scope('no_sensitive').findByPk(id);

        let rest = user;

        if(user.private_email && !validatePermission(types.PERMISSION_TYPE.BOTH, req.user, id)){
            const {email:ignore, ...restx} = user;
            rest = restx;
        }

        return res.status(200).json({
            msg:'success',
            user: rest
        })

    }catch(e){
        console.log(e);
        return res.status(500).json({msg:'Something went wrong'});
    }
}

const getUsers = async (req, res) => {
    try{

        const {limit, from, archived, orderBy} = req.query;
        const {field, by} = validateOrderBy(orderBy, ['username', 'createdAt']);

        const {count, rows} = await User.scope('no_sensitive_email').findAndCountAll({
                where:{
                    archived: archived === 'true'
                },
                order: [[field, by]],
                limit: Number(limit) || 10,
                offset: Number(from) || 0
            }
        );
    
        return res.status(200).json({
            msg:'success',
            total: count,
            users: rows
        })

    }catch(e){
        console.log(e);
        return res.status(500).json({msg:'Something went wrong'});
    }
    
}

const putArhieveUser = async (req, res) => {
    try{

        const {id} = req.params;
        const {archived} = req.body;

        if(!validatePermission(types.PERMISSION_TYPE.ADMIN, req.user, 0)){
            return res.status(401).json();
        }

        const user = await User.findByPk(id);
        await user.update({archived});

        res.status(201).json({
            msg:'success',
            user: {id, archived}
        })

    }catch(e){
        console.log(e);
        return res.status(500).json({msg:'Something went wrong'});
    }
}

const putChangeRoleUser = async (req, res) => {
    try{

        const {id} = req.params;
        const {role} = req.body;

        if(!validatePermission(types.PERMISSION_TYPE.ADMIN, req.user, 0)){
            return res.status(401).json();
        }

        const user = await User.findByPk(id);
        await user.update({role_id:role});

        res.status(201).json({
            msg:'success',
            user: {id, role}
        })

    }catch(e){
        console.log(e);
        return res.status(500).json({msg:'Something went wrong'});
    }
}

const putSensitiveUser = async (req, res) => {
    try{

        const {id} = req.params;
        const {old_password, new_password} = req.body;
        
        if(!validatePermission(types.PERMISSION_TYPE.BOTH, req.user, id)){
            return res.status(401).json();
        }

        const newPassword = bcrypt.hashSync(new_password, bcrypt.genSaltSync());
        const userSchema = await User.findByPk(id);
        const user = userSchema.toJSON();

        if(bcrypt.compareSync(old_password, user.password)){
            await userSchema.update({password:newPassword});
    
            return res.status(201).json({
                msg:'success'
            })
        }
        else{
            return res.status(400).json({
                msg:'Incorrect password'
            });
        }

    }catch(e){
        console.log(e);
        return res.status(500).json({msg:'Something went wrong'});
    }
}

const putBasicUser = async (req, res) => {
    try{

        const {id} = req.params;

        if(!validatePermission(types.PERMISSION_TYPE.BOTH, req.user, id)){
            return res.status(401).json();
        }

        const {description, username, private_email} = req.body;
        const user = await User.scope('no_sensitive_email').findByPk(id);
        
        if(description || username || private_email){
            await user.update({description, username, private_email});
        }
    
        return res.status(201).json({
            msg:'success',
            user
        })

    }catch(e){
        console.log(e);
        return res.status(500).json({msg:'Something went wrong'});
    }
}

const deleteUser = async (req, res) => {
    try{
        const {id} = req.params;

        if(!validatePermission(types.PERMISSION_TYPE.BOTH, req.user, id)){
            return res.status(401).json();
        }

        const user = await User.scope('no_sensitive_email').findByPk(id);
    
        await user.update({archived:true});
    
        return res.status(201).json({
            msg:'success',
            user
        })

    }catch(e){
        console.log(e);
        return res.status(500).json({msg:'Something went wrong'});
    }
}

module.exports = {
    getUser,
    getUsers,
    putArhieveUser,
    putSensitiveUser,
    putChangeRoleUser,
    putBasicUser,
    deleteUser
}