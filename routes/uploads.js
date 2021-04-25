const { Router } = require("express");
const { check } = require("express-validator");

const { loadUserImage, getUserImage, loadSong, deleteSong, getSongFile, copySong } = require("../controllers/uploads");
const { validateString, validateInteger } = require("../helpers/validate-fields");
const { userExists, validateEmotionCode, songExists } = require("../helpers/validate-to-db");
const { validateFields } = require("../middlewares/validate-fields");
const { validateFile } = require("../middlewares/validate-file");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.put('/:userId/image', [
    validateJWT,
    check('userId').        custom(userExists),
    validateFile,
    validateFields
], loadUserImage);

router.get('/:userId/image', [
    check('userId').         custom(userExists),
    validateFields
], getUserImage)

router.post('/songs', [
    validateJWT,
    check('emotionCode').   custom((v) => validateInteger(v, true, 10, 0)),
    check('title').         custom((v) => validateString(v, false, 1, 70)),
    check('emotionCode').   custom(validateEmotionCode),
    validateFields
], loadSong);

router.post('/songs/:id/clone', [
    validateJWT,
    check('id').            custom(songExists),
    validateFields
], copySong);

router.delete('/songs/:id', [
    validateJWT,
    check('id').            custom(songExists),
    validateFields
], deleteSong);

router.get('/songs/:id', [
    check('id').            custom(songExists),
    validateFields
], getSongFile);


module.exports = router;