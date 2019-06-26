var mongoose = require('../config/config');

var Schema = mongoose.Schema;

var PatientAnswerSchema = new Schema({
  questionnaire_id: {
    type: Schema.Types.ObjectId,
    ref: 'QuestionnaireModel',
    required: true
  },
  answer: {
    type: {
      title: {
        type: 'String',
        required: true
      },
      value: {
        type: 'Number',
        required: true
      }
    },
    required: true
  }
});

var PatientAnswerModel = mongoose.model('PatientAnswerModel', PatientAnswerSchema, 'patientanswers');
module.exports = PatientAnswerModel;
