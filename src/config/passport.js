const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../model/User');

passport.use(new localStrategy({
    usernameField:'email',
    passwordField:'password'
}, async (email,password,done)=>{

    //Match Email:
    const user = await User.findOne({email})
    if (!user){
        return done(null,false,{message:'Not User Found'})
    }else{
        //Match User's Password:
        const match = await user.matchPassword(password)
        if(match){
            return done(null,user)
        }else{
            return done(null,false,{message:'Incorrect Password'})
        }
    }
}));

passport.serializeUser((user,done)=>{
    done(null,user.id)
});

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user);
    })
});