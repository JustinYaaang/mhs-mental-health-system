var mongoose = require('../config/mongoose');
var bcrypt = require('bcryptjs');
var saltRounds = 10;
var uuidv1 = require('uuid/v1');

var Schema = mongoose.Schema;

var PatientSchema = new Schema({
  email: {
    type: 'String',
    required: true
  },
  password:{
    type: 'String',
    required: true
  },
  code: {
    type: 'String',
    default: uuidv1()
  },
  expiration_data: {
    type: Date,
    default: new Date(+new Date() + 1*24*60*60*1000)
  },
  is_live: {
    type: Boolean,
    default: false
  }
});


// hash user NHS number before saving into database
PatientSchema.pre('save', function(next) {
  var salt = bcrypt.genSaltSync(saltRounds);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});


var PatientModel = mongoose.model('PatientModel', PatientSchema, 'patients');
module.exports = PatientModel;
