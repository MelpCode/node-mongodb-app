
const ctrlIndex = require('../controllers/index.controllers');
const express = require('express');
const router = express.Router();

router.get('/index',ctrlIndex.renderIndex);
router.get('/books',ctrlIndex.renderAllBooks)
router.get('/login',ctrlIndex.renderLoginForm);
router.get('/register',ctrlIndex.renderRegisterForm)


module.exports = router;