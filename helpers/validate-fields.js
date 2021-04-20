const types = require("../models/types/types");
const { obj2StringPretty } = require("./util");

const basicFieldValidation = (field, type, required=false)=>{
    if(!field && typeof field === "undefined"){
        if(!required) return true;

        throw new Error('Field is mandatory');
    }
    if(typeof field !== type){
        throw new Error(`Field must be type: ${type}`);
    }
}

const validateString = (field, required=false, minLength=6, maxLength=200, pattern) => {
    if(basicFieldValidation(field, 'string', required)) return true;

    if(field.length < minLength){
        throw new Error(`Field must be at least ${minLength} characters long`);
    }
    if(field.length > maxLength){
        throw new Error(`Field overpass ${maxLength} characters long`);
    }
    if(pattern && !pattern.test(field)){
        throw new Error(`Field has an invalid format`);
    }

    return true;
}

const validateInteger = (field, required=false, maxLength=Number.MAX_VALUE, minLength=Number.MIN_VALUE)=>{
    if(basicFieldValidation(field, 'number', required)) return true;

    if(field < minLength){
        throw new Error(`Field underpass ${minLength}`);
    }

    if(field > maxLength){
        throw new Error(`Field overpass ${maxLength}`);
    }

    return true;
}

const validateBoolean = (field, required=false) =>{
    if(basicFieldValidation(field, 'boolean', required)) return true;

    return true;
}

const validateFileType = (field, required=false, minLength=6, maxLength=200, pattern) => {
    validateString(field, required, minLength, maxLength, pattern);

    const validTypes = ['images', 'songs'];

    if(!validTypes.includes(field)){
        throw new Error(`Invalid type, use: ${validTypes} instead`);
    }

    return true;
}

const validateComponentType = (field, required=false, minLength=6, maxLength=200, pattern) => {
    validateString(field, required, minLength, maxLength, pattern);

    const validTypes = [types.SEARCH_COMPONENTS.SONGS, types.SEARCH_COMPONENTS.USERS];

    if(!validTypes.includes(field)){
        throw new Error(`Invalid type, use: [${validTypes}] instead`);
    }

    return true;
}

module.exports = {
    validateInteger,
    validateString,
    validateBoolean,
    basicFieldValidation,
    validateFileType,
    validateComponentType
}