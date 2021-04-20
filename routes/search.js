const { Router } = require("express");
const { check } = require("express-validator");
const { searchElements } = require("../controllers/search");
const { validateString, validateComponentType } = require("../helpers/validate-fields");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.get('/:component/:searchTerm', [
    validateJWT,
    check('component').         custom((v)=>validateComponentType(v, true, 1)),
    check('searchTerm').        custom((v)=>validateString(v, true, 1, 70)),
    validateFields
], searchElements)

module.exports = router;