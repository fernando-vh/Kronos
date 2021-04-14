const { Router } = require("express");
const { check } = require("express-validator");
const { getSong, getSongs, updateSong } = require("../controllers/song");
const { validateString } = require("../helpers/validate-fields");

const { songExists
    } = require("../helpers/validate-to-db");
    
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.get('/', [validateJWT], getSongs);

router.get('/:id',[
    validateJWT,
    check('id').            custom(songExists),
    validateFields,
], getSong);

router.put('/:id',[
    validateJWT,
    check('title').         custom((v) => validateString(v, false, 1, 70)),
    check('id').            custom(songExists),
    validateFields,
], updateSong);

module.exports = router;