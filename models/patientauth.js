var mongoose = require('../config/config');

var Schema = mongoose.Schema;

var PatientGroupSchema = new Schema({
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

var PatientAuthModel = mongoose.model('PatientGroupModel', PatientGroupSchema, 'patientgroup' );
module.exports = PatientAuthModel;
