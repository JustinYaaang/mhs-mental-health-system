var mongoose = require('../config/mongoose');

var Schema = mongoose.Schema;

var OrganisationSchema = new Schema({
  role:{
    type: 'String',
    enum: ['TRUST', 'SERVICE']
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
    ref: 'PatientModel',
	},
});


// hash user NHS number before saving into database
// PatientSchema.pre('save', function(next) {
//   this.NHS_number = bcrypt.hashSync(this.NHS_number, saltRounds);
//   next();
// });

// bcrypt.compareSync(req.body.password, userInfo.password)

var OrganisationModel = mongoose.model('OrganisationModel', OrganisationSchema, 'organisations');
module.exports = OrganisationModel;
