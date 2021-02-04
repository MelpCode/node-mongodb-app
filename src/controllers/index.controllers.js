
const Book = require('../model/Book');
const User = require('../model/User');

const ctrlIndex = {}

ctrlIndex.renderIndex = (req,res)=>{
    res.render('index')
}

ctrlIndex.renderAllBooks = async (req,res)=>{
    const books = await Book.find();
    res.render('books/all-books',{
        books:books.map(book=>book.toJSON())
})
}

ctrlIndex.renderLoginForm = (req,res)=>{
    res.render('login')
}

ctrlIndex.renderRegisterForm = (req,res)=>{
    res.render('register')
}
module.exports = ctrlIndex;