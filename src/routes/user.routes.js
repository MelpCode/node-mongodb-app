const ctrlUser = require('../controllers/user.controllers');
const ctrlBook = require('../controllers/book.controllers');
const express = require('express');

const {isAuthenticated} = require('../helpers/auth');

const router = express.Router();

router.post('/register',ctrlUser.registerNewUser);
router.get('/user/books',isAuthenticated,ctrlBook.renderBooksList)
router.post('/login',ctrlUser.login);
router.get('/logout',ctrlUser.logout)

module.exports = router;