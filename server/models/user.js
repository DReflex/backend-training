const mongoose = require('mongoose');
require('mongoose-long')(mongoose);
var SchemaTypes = mongoose.Schema.Types;
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
  username:{
    type:String,
    required: [true, 'username is required'],
    unique: true
  },
  password: {
    type:String,
    required: [true, "password is required"]
  },
  email:{
    type: String,
    required: [true, "email is required"],
    unique: true
  }

});
const User = mongoose.model('user', UserSchema);
module.exports = User;
// User.create({username: "reflex", password: 'Minion', email:"this is email"}, function(err, doc) {
//      At this point the jobs collection is created.
// });
