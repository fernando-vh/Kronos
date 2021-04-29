const { Router } = require("express");
const { check } = require("express-validator");

const { getUser,
        getUsers,
        putSensitiveUser,
        deleteUser,
        putBasicUser,
        putArhieveUser,
        putChangeRoleUser
    } = require("../controllers/user");

const { validateString,
        validateBoolean,
        validateInteger
    } = require("../helpers/validate-fields");

const { validateRole,
        userExists
    } = require("../helpers/validate-to-db");
    
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.get('/', [validateJWT], getUsers);

router.get('/:id',[
    validateJWT,
    check('id').            custom(userExists),
], getUser);

router.put('/:id/basic',[
    validateJWT,
    check('username').      custom((v)=>validateString(v, false, 3, 50)),
    check('description').   custom((v)=>validateString(v, false, 0, 250)),
    check('private_email'). custom((v)=>validateBoolean(v, false)),
    check('id').            custom(userExists),
    validateFields,
], putBasicUser);

router.put('/:id/archive',[
    validateJWT,
    check('archived').      custom((v)=>validateBoolean(v, true)),
    check('id').            custom((v)=>userExists(v, true)),
    validateFields,
], putArhieveUser);

router.put('/:id/role',[
    validateJWT,
    check('role').          custom(validateRole),
    check('id').            custom((v)=>userExists(v, true)),
    validateFields,
], putChangeRoleUser);

router.put('/:id/password',[
    validateJWT,
    check('old_password').  custom((v)=>validateString(v, true, 6, 200)),
    check('new_password').  custom((v)=>validateString(v, true, 6, 200)),
    check('id').            custom(userExists),
    validateFields,
], putSensitiveUser);

router.delete('/:id',[
    validateJWT,
    check('id').            custom(userExists),
], deleteUser);

module.exports = router;