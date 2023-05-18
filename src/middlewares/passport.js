const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {userModel} = require('../models/user.model');
const {hashPassword, validPassword} = require('../utils/hash');

const GitHubStrategy = require('passport-github2').Strategy;


passport.use('register', new LocalStrategy({passReqToCallback:true, usernameField:'email'},
async(req,username,password,done)=>{
    const {firts_name, last_name, age} = req.body;
const user = await userModel.findOne({email: username});

try {
    if(user){
        return done(null,false)
    }else{
        const newUser = {
    firts_name,
    last_name,
    age,
    email:username,
    password: hashPassword(password)
        }
    const response = await userModel.create(newUser);
    const sessionUser = {
        _id: response._id,
        firts_name: response.first_name,
        last_name: response.last_name,
        email: response.email,
        age: response.age
    }
    return done(null,sessionUser)
    }

} catch (error) {
    done(error)
}

}))

passport.use('login', new LocalStrategy({usernameField:'email'},
async(username,password,done)=>{
    try {
        const user = await userModel.findOne({email:username})
    if(!user && !validPassword(user,password)){
        return done(null,false)
    }else{
        return done(null,user)
    }

    } catch (error) {
        done(error)
    }

}))






passport.use('github', new GitHubStrategy({
    clientID:'Iv1.6a45f8ee5ecf3610',
    clientSecret:'19dbaeaf13d0e2ea9b0a2703ae8ef819c7d5370f',
    callbackURL:'http://localhost8080/api/session/githubcallback'
},async(accesToken,refreshToken,profile,done)=>{
    try {
        console.log(profile)
        const user = await userModel.findOne({email:profile._json.email})
        if(!user){
            const newUser = {
                first_name: profile._json.name,
                last_name: "",
                age:18,
                email: profile._json.email,
                password: "",
        
            }

        const response = await userModel.create(newUser)
           return  done(null,newUser)
        }else{
            return done(null,user)
        }
        
    } catch (error) {
        done(error)
    }
}))


passport.serializeUser((user,done)=>{
    return done(null,user._id)
    })

passport.deserializeUser(async(id,done)=>{
        const user = await userModel.findById(id);
      done(null, user);
    })

module.exports = passport;