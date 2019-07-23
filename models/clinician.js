var mongoose = require('../config/mongoose');
var bcrypt = require('bcryptjs');
var saltRounds = 10;

var Schema = mongoose.Schema;

var ClinicianSchema = new Schema({
  email: {
    type: 'String',
    required: true
  },
  password:{
    type: 'String',
    required: true
  }
});

// hash user NHS number before saving into database
ClinicianSchema.pre('save', function(next) {
  var salt = bcrypt.genSaltSync(saltRounds);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

// bcrypt.compareSync(req.body.password, userInfo.password)

var ClinicianModel = mongoose.model('ClinicianModel', ClinicianSchema, 'clinicians');
module.exports = ClinicianModel;
