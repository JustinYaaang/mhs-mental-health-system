var mongoose = require('../config/mongoose');
var bcrypt = require('bcryptjs');
var saltRounds = 10;

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  role: {
    type: 'String',
    enum: ['ADMIN', 'TRUSTMANAGER', 'SERVICEMANAGER']
  },
  email: {
    type: 'String',
    required: true
  },
  password: {
    type: 'String',
    required: true
  },
  first_name: {
    type: 'String',
    required: true
  },
  last_name: {
    type: 'String',
    required: true
  },
  postcode: {
    type: 'String',
  },
  organisation_id: {
    type: Schema.Types.ObjectId,
    ref: 'OrganisationModel',
    required: true
  }
});

// hash user password before saving into database
UserSchema.pre('save', function(next) {
  var salt = bcrypt.genSaltSync(saltRounds);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

// bcrypt.compareSync(req.body.password, userInfo.password)

var UserModel = mongoose.model('UserModel', UserSchema, 'users');
module.exports = UserModel;
