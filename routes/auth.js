const { Router } = require("express");
const { check } = require("express-validator");
const passport = require('passport');

const { loginInternal,
        sigInInternal, 
        signInGoogle,
        checkTokenIntegrity,
        siginFacebook
    } = require("../controllers/auth");

const { validateString,
        validateBoolean 
    } = require("../helpers/validate-fields");
    
const { emailExists } = require("../helpers/validate-to-db");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.post('/validateToken',[
    validateJWT
], checkTokenIntegrity);

router.post('/login',[
    check('password').      custom(v => validateString(v, true, 0)),
    check('email').         custom((v)=>validateString(v, true, 0, 50, /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/)),
    validateFields
], loginInternal)

router.post('/signin',[
    check('username').      custom((v)=>validateString(v, true, 3, 50)),
    check('email').         custom((v)=>validateString(v, true, 5, 50, /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/)),
    check('password').      custom((v)=>validateString(v, true, 6, 200)),
    check('description').   custom((v)=>validateString(v, false, 3, 250)),
    check('private_email'). custom((v)=>validateBoolean(v, false)),
    check('email').         custom(emailExists),
    validateFields,
], sigInInternal);

router.post('/login/google', signInGoogle);

router.post('/login/facebook',[
    passport.authenticate('facebook-token', {session:false})
], siginFacebook);

module.exports = router;