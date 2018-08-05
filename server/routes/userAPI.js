const express= require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = require('../models/user');

//get all
router.get('/user', function(req, res, next){
  User.find({}).then(function(result){
    res.send(result);
  }).catch(next);
});
//get by id
router.get('/user/:id', function(req, res, next){
  //use validator to make sure that id is of correct form
  var validator = mongoose.Types.ObjectId.isValid(req.params.id);
  if(validator){
    User.findOne({"_id":req.params.id})
    .then(function(response, err){
      if(response.length === 0){
        res.status(404);
        res.send("none");
      }
      else{
        console.log(response);
        res.send(response)
      }
    }).catch(next)
    }else{
      res.status(422);
      res.send("invalid id form")
    }
  })
// create
  router.post('/user', function(req, res, next){
    var checkUsername = validator("username", req.body.username)
    var checkEmail = validator("email", req.body.email)
      if(checkUsername && checkEmail){
        User.create(req.body).then(function(user, err){
          res.send(user)
        }).catch(next)
      }else{
        res.status(422);
        res.send("invalid input")
      }
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
  // ckeck if this param is valid form email or username
  // then check if its in db
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
  // stack overflow
}
function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}



module.exports = router;
