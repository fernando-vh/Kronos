const validateOrderBy = (orderBy, validFields)=>{
    let [field, by] = (orderBy && orderBy.split(':')) || `${validFields[0]}:DESC`;
    
    field = (field && validFields.find((v)=>v===field)) || validFields[0];
    by = (by && ['ASC', 'DESC'].find((v)=>v===by)) || 'ASC';

    return {field, by};
}

module.exports = {
    validateOrderBy
}