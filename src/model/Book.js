const {Schema,model} = require('mongoose');

const bookSchema = new Schema({
    title:{type:String},
    author:{type:String},
    genre:{type:String},
    imagebook:{type:String,default:'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/book-512.png'},
    registeredBy:{type:String}
})

module.exports = model('Book',bookSchema)