var mongoose = require('../config/mongoose');

var Schema = mongoose.Schema;

var PatientAnswerSchema = new Schema({
    role: {
      type: 'String',
      enum: ['FORM1ANSWER', 'FORM2ANSWER']
    },
    title: {
      type: 'String',
      required: true
    },
    score: {
      type: 'Number',
      required: true
    },
    body: {
      type: 'String',
      required: true
    },
    status:{
      type: 'String',
      enum: ['PENDING', 'RESOLVED'],
      default: 'PENDING'
    },
    questionnaireBody: {
      type: 'String',
      required: true
    },
    patient_id: {
  		type: Schema.Types.ObjectId,
      ref: 'PatientModel',
      required: true
  	},
    service_id: {
  		type: Schema.Types.ObjectId,
      ref: 'OrganisationModel',
      required: true
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
