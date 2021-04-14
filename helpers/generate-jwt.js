const jwt = require('jsonwebtoken');

const generateJWT = (payload) => {
    return new Promise((resolve, reject) => {

        jwt.sign(payload, process.env.SECRET_TOKEN_KEY, {
            expiresIn: '1h'
        }, (err, token) => {
            if(err){
                reject(`Couldn't generate json token`);
            }
            else{
                resolve(token);
            }
        })
    })
}

module.exports = {
    generateJWT
}