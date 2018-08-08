const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user');
const config = require('./database');
const bcrypt = require('bcryptjs');

module.exports = function(passport){
  passport.use(
    new LocalStrategy(function(username, password, done){
      let query ={username:username}
      User.findOne(query, function(err, user){
        if(err) throw err;
        if(!user){
          console.log("no user found");
          return done(null,false, {message:"no user"})
        }
        //Match password with bcryptjs
        bcrypt.compare(password, user.password, function(err, match){
          if(err) throw err;
          if(match){
            console.log("should connect", user);
            return done(null, user);
          }else{
            console.log("wrong password");
            return done(null, false, {message: "wrong password"})
          }
        })
      })
    })
  );
  passport.serializeUser(function(user, done){
    done(user.id)
  });

  passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
      done(err,user)
    })
  })

}
