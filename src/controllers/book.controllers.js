const Book = require('../model/Book');

const ctrlBook = {}

ctrlBook.renderBookForm = (req,res)=>{
    res.render('books/bookForm');
}

ctrlBook.renderBooksList = async (req,res)=>{
    const books = await Book.find({registeredBy:req.user.name});
    console.log(books)
    res.render('books/list-books',{
        books:books.map(book=>book.toJSON())
    })
}

ctrlBook.createNewBook = async (req,res)=>{
    const {title,author,genre,imagebook} = req.body;
    const newBook = new Book({
        title,
        author,
        genre,
        imagebook,
    });
    if (!imagebook){
        newBook.imagebook = 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/book-512.png';
    }
    newBook.registeredBy = req.user.name;
    await newBook.save();
    req.flash('success_msg','Book Added Successfully');
    res.redirect('/user/books')
}

ctrlBook.renderEditForm = async (req,res)=>{
    const {id} = req.params;
    const book = await Book.findById(id).lean();
    res.render('books/edit-form',{book});
}

ctrlBook.updateBook = async (req,res)=>{
    const {id} = req.params;
    await Book.findByIdAndUpdate(id,req.body);
    req.flash('success_msg','Book Updated Successfully')
    res.redirect('/user/books');
}

ctrlBook.deleteBook = async(req,res)=>{
    if(book.registeredBy != req.user.id){
        req.flash('error_msg','Not Authorized');
        return res.redirect('/user/books');
    }
    const {id} = req.params;
    await Book.findByIdAndDelete(id);
    req.flash('success_msg','Book Deleted Successfully');
    res.redirect('/user/books')
}

module.exports = ctrlBook;