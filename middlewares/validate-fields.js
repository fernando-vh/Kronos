const { validationResult } = require("express-validator");

const validateFields = (req, res, next) => {
    const result = validationResult(req); 
    
    if(!result.isEmpty()){
        return res.status(400).json({
            msg:"No valid data!",
            errors: result.errors
        });
    }

    next();
}

module.exports = {
    validateFields
}