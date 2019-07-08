var mongoose = require('../config/config');

var Schema = mongoose.Schema;

var PatientAuthSchema = new Schema({
	patient_id: {
		type: Schema.Types.ObjectId,
    ref: 'PatientModel',
	},
  questionnaire_id: {
		type: Schema.Types.ObjectId,
    ref: 'QuestionnaireModel',
    required: true
	},
});

var PatientAuthModel = mongoose.model('PatientAuthModel', PatientAuthSchema, 'patientauth' );
module.exports = PatientAuthModel;
