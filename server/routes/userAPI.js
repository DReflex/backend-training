const express= require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport')

//get all
router.get('/user', function(req, res, next){
  User.find({}).then(function(result){
    res.send(result);
  }).catch(next);
});
//get by id
router.get('/user/:username', function(req, res, next){
  //use validator to make sure that id is of correct form
    User.findOne({"username":req.params.username})
    .then(function(response){
       if(!response){
         res.status(404);
         res.send("none");
       }
       else{
        res.send(response)
      }
    }).catch(next)
  })
// create
  router.post('/user', function(req, res, next){
    var checkUsername = validator("username", req.body.username)
    var checkEmail = validator("email", req.body.email)
      if(checkUsername && checkEmail){
        let newUser = {
          username:req.body.username,
          email: req.body.email,
          password: req.body.password
        }
        console.log("all tests passed");
        bcrypt.genSalt(10, function(err, salt) {
            console.log("we are in salt");
            bcrypt.hash(newUser.password, salt, function(err,hash){
              if(err){
                console.log(err);
              }
              newUser.password = hash;
              User.create(newUser).then(function(Product){
                res.send(Product);
              }).catch(next)
            })
          })

      }else{
        res.status(422);
        res.send("invalid input")
      }
    })
//login user here
  router.post('/login', function(req, res, next){
    passport.authenticate('local', function (err, user) {
        req.logIn(user, function() {
            res.status(err ? 500 : 200).send(err ? err : user);
        });
    })(req, res, next);
  });
  //change password
  router.put('/change', function(req, res, next){
    //check for user cedentials then update password using bcryptjs

    //just need to make sure the username and password are correct and first 2 arguments
    passport.authenticate('local', function (err, user) {
        req.logIn(user, function() {
          //handle change password here
          //create let to store password change
          let newPassword ={
            password: req.body.new_password
          }
          //create hash
          bcrypt.genSalt(10, function(err, salt) {
              bcrypt.hash(newPassword.password, salt, function(err,hash){
                if(err){
                  console.log(err);
                }
                newPassword.password = hash;
                //send newPassword object to change password
                User.findOneAndUpdate({_id: user._id}, newPassword).then(function(){
                  User.findOne({_id: user._id}).then(function(user){
                    res.send(user);
                  });
                }).catch(next);
              })
            })

        });
    })(req, res, next);

  })

//update
    router.put('/user/:id', function(req, res, next){
      var checkUsername = validator("username", req.body.username)
      var checkEmail = validator("email", req.body.email)
      if(checkUsername && checkEmail){

        User.findOneAndUpdate({_id: req.params.id}, req.body).then(function(){
          User.findOne({_id: req.params.id}).then(function(user){
            res.send(user);
          });
        }).catch(next);
      }else{
          res.status(422);
          res.send("invalid input")
        }
  });
//delete
  router.delete('/user/:id', function(req, res, next){
    User.findByIdAndRemove({_id: req.params.id}).then(function(del){
      res.send(del);
    }).catch(next);
  })

function validator(param, value){
  //param = username
  // value = "value"
  // use regex ta validate email and to make sure username is of correct form
  if(param === "username"){
    // validate
    var returnUsername = Boolean
    var regex = /^[a-zA-Z0-9_.-]*$/.test(value);
    return regex

  }else if(param === "email"){
    var returnEmail
    var regex = validateEmail(value);

    return regex
  }
}
// stack overflow
function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}



module.exports = router;
