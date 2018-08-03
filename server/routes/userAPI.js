const express= require('express');
const router = express.Router();
const User = require('../models/user');

//get all
router.get('/user', function(req, res, next){
  User.find({}).then(function(result){
    res.send(result);
  }).catch(next);
});


module.exports = router;
