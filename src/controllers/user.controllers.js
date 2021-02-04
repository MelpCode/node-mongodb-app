
const passport = require('passport');
const User = require('../model/User');
const ctrlUser = {};

ctrlUser.registerNewUser = async (req,res)=>{
    const errors = []
    const {name,lastname,email,password,password_confirm} = req.body;
    if(password!=password_confirm){
        errors.push({text:'Password do not match'})
    }
    if(password.length<7){
        errors.push({text:'Passwords must be at least 4 characters'})
    }
    if(errors.length>0){
        res.render('register',{
            errors,
            name,
            lastname,
            email,
            password,
            password_confirm
        });
    }else{
        const emailUser = await User.findOne({email:email});
        if(emailUser){
            req.flash('error_msg','The email is already in use');
            res.redirect('/register');
        }else{
            const newUser = new User({name,lastname,email,password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg','You are registered');
            res.redirect('/login')
        } 
    }
}

ctrlUser.login = passport.authenticate('local',{
    failureFlash:true,
    failureRedirect:'/login',
    successRedirect:'/user/books',
})

ctrlUser.logout = (req,res)=>{
    req.logout();
    req.flash('success_msg','You are Logged out now');
    res.redirect('/login');
}



module.exports = ctrlUser;