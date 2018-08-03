const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');


const app =express();
app.set('port', (process.env.PORT || 4000));

var promise = mongoose.connect( 'mongodb://localhost:27017/login',{
  useNewUrlParser: true,
})
mongoose.connection.on('open', function(err, doc){
    console.log("connection established");
  });

mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use('/api', require('./routes/userAPI'));


//init app
//build part of the react app
//uncoment this after npm build
app.use('/', express.static(path.join(__dirname, '../dist')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

//err
app.use(function(err, req, res, next){
  //console.log(err);
  res.status(422).send({error: err.message})
});

//port
app.listen(app.get('port'), function () {
    console.log('App listening on port ' + app.get('port'));
});
