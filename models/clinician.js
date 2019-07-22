var mongoose = require('../config/mongoose');
var bcrypt = require('bcrypt');
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
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

// bcrypt.compareSync(req.body.password, userInfo.password)

var ClinicianModel = mongoose.model('ClinicianModel', ClinicianSchema, 'clinicians');
module.exports = ClinicianModel;
