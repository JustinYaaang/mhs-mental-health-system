var mongoose = require('../config/mongoose');

var Schema = mongoose.Schema;

var ClinicianSchema = new Schema({
  NHS_number: {
    type: 'String',
    required: true
  },
});


// hash user NHS number before saving into database
// PatientSchema.pre('save', function(next) {
//   this.NHS_number = bcrypt.hashSync(this.NHS_number, saltRounds);
//   next();
// });

// bcrypt.compareSync(req.body.password, userInfo.password)

var ClinicianModel = mongoose.model('ClinicianModel', ClinicianSchema, 'clinicians');
module.exports = ClinicianModel;
