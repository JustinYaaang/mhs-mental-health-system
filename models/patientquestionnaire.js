var mongoose = require('../config/mongoose');

var Schema = mongoose.Schema;

var PatientQuestionnaireSchema = new Schema({
  patient_id: {
    type: Schema.Types.ObjectId,
    ref: 'PatientModel',
    required: true
  },
  questionnaire_id: {
    type: Schema.Types.ObjectId,
    ref: 'Questionnaire_sJSModel',
    required: true
  }
});

var PatientQuestionnaireModel = mongoose.model('PatientQuestionnaireModel', PatientQuestionnaireSchema, 'patientquestionnaires');
module.exports = PatientQuestionnaireModel;
