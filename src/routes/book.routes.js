
const ctrlBook = require('../controllers/book.controllers');
const express = require('express');
const {isAuthenticated} = require('../helpers/auth');

const router = express.Router();

router.get('/addbook',isAuthenticated,ctrlBook.renderBookForm);
router.get('/books/edit/:id',isAuthenticated,ctrlBook.renderEditForm)

router.put('/books/edit/:id',isAuthenticated,ctrlBook.updateBook)

router.post('/books',isAuthenticated,ctrlBook.createNewBook);
router.delete('/books/delete/:id',isAuthenticated,ctrlBook.deleteBook);

module.exports = router;