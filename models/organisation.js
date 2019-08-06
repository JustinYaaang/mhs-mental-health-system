var mongoose = require('../config/mongoose');
var UserModel = require('../models/user')

var Schema = mongoose.Schema;

var OrganisationSchema = new Schema({
  role: {
    type: 'String',
    enum: ['ADMIN', 'TRUST', 'SERVICE']
  },
  name: {
    type: 'String',
    required: true
  },
  address1: {
    type: 'String',
    required: true
  },
  address2: {
    type: 'String',
    required: true
  },
  postcode: {
    type: 'String',
    required: true
  },
  description: {
    type: 'String',
    required: true
  },
  link: {
    type: 'String',
    required: true
  },
  email: {
    type: 'String',
    required: true
  },
  telephone: {
    type: 'String',
    required: true
  },
  organisation_id: {
    type: Schema.Types.ObjectId,
    ref: 'OrganisationModel',
  },
});

OrganisationSchema.post('remove', function(doc) {
  UserModel.deleteMany({
    organisation_id: doc.organisation_id
  }, function(err) {
    if (err) return handleError(err);
  });
});


var OrganisationModel = mongoose.model('OrganisationModel', OrganisationSchema, 'organisations');
module.exports = OrganisationModel;
