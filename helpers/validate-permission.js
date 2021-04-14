const types = require("../models/types/types")

const validatePermission = (permissionType, origin_user, target_uid) => {
    let valid;

    switch(permissionType){
        case types.PERMISSION_TYPE.BOTH:;
            valid = origin_user.role_id === types.ROLE.ADMIN_ROLE || 
                    target_uid == origin_user.id;
            break;

        case types.PERMISSION_TYPE.ADMIN:
            valid = origin_user.role_id === types.ROLE.ADMIN_ROLE;
            break;

        case types.PERMISSION_TYPE.USER:
            valid = target_uid == origin_user.id;
            break;
    }

    return valid;
}

module.exports = {
    validatePermission
}