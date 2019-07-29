var mongoose = require('../config/mongoose');

var Schema = mongoose.Schema;

var PatientAnswerSchema = new Schema({
    questionnaire_id: {
      type: Schema.Types.ObjectId,
      ref: 'Questionnaire_sJSModel',
      required: true
    },
    title: {
      type: 'String',
      required: true
    },
    score: {
      type: 'String',
      required: true
    },
    body: {
      type: 'String',
      required: true
    },
    status:{
      type: 'String',
      enum: ['PENDING', 'RESOLVED']
    },
    questionnaireBody: {
      type: 'String',
      required: true
    },
    patient_id: {
  		type: Schema.Types.ObjectId,
      ref: 'PatientModel',
  	},
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
