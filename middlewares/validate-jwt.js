const jwt = require('jsonwebtoken');

const User = require('../models/dbModels/user');

const validateJWT = async (req, res, next) => {
    const token = req.header('authorization');
    
    try{

        const {id, username, role_id} = jwt.verify(token.split(' ')[1], process.env.SECRET_TOKEN_KEY);
        const user = await User.findByPk(id);

        if(!user || user.archived){
            return res.status(401).json();
        }

        req.user = {id, username, role_id};

        next();

    }catch(e){
        return res.status(401).json();
    }
}

module.exports = {
    validateJWT
}