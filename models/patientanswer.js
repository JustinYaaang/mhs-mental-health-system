var mongoose = require('../config/mongoose');

var Schema = mongoose.Schema;

var PatientAnswerSchema = new Schema({
    questionnaire_id: {
      type: Schema.Types.ObjectId,
      ref: 'Questionnaire_sJSModel',
      required: true
    }, //questionnaire id , questionnaire name, patient name, score,timestamp
    title: { //questionnaire's title
      type: 'String',
      required: true
    },
    patient_name: { //patient's name TODO change to NHS number
      type: 'String',
      required: true
    },
    score: { //questionnaire's score
      type: 'String',
      required: true
    },
    //questionnaire's answers
    body: {
      type: 'String',
      required: true
    },
    //questionnaire's body
    questionnaireBody: {
      type: 'String',
      required: true
    }
  },
  //timestamp that the questionnaire was completed
  {
    timestamps: {
      createdAt: true,
      updatedAt: true
    }
  });

var PatientAnswerModel = mongoose.model('PatientAnswerModel', PatientAnswerSchema, 'patientanswers');
module.exports = PatientAnswerModel;
