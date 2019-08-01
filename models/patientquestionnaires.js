var mongoose = require('../config/mongoose');

var Schema = mongoose.Schema;

var PatientAnswerSchema = new Schema({
  patient_id: {
    type: Schema.Types.ObjectId,
    ref: 'PatientModel',
    required: true
  },
  uestionnaire_id: {
    type: Schema.Types.ObjectId,
    ref: 'Questionnaire_sJSModel',
    required: true
  }
});

var PatientAnswerModel = mongoose.model('PatientAnswerModel', PatientAnswerSchema, 'patientanswers');
module.exports = PatientAnswerModel;
