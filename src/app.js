const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const passport = require('passport');

//Initialization
const app = express();
require('./database');
require('./config/passport');

//Settings
app.set('port',process.env.PORT || 3500);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphbs({
    defaultLayout:'main',
    layoutsDir:path.join(__dirname,'views/layout'),
    partialsDir:path.join(__dirname,'views/partials'),
    extname:'.hbs'
}));
app.set('view engine','.hbs');

//Middleware
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));
app.use(flash());
app.use(methodOverride('_method'));
app.use(passport.initialize());
app.use(passport.session());


//Global variables
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
})

//Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/book.routes'));
app.use(require('./routes/user.routes'));

//Static Files
app.use(express.static(path.join(__dirname,'public')))
//Exporting module
module.exports = app;



