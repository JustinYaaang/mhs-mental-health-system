var mongoose = require('../config/mongoose');
var preSave = require('./pre-save/patientanswer');

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
      type: 'Number'
    },
    body: {
      type: Schema.Types.Mixed,
      required: true
    },
    status: {
      type: 'String',
      enum: ['PENDING', 'RESOLVED'],
      default: 'PENDING'
    },
    questionnaireBody: {
      type: Schema.Types.Mixed,
      required: true
    },
    rules: {
      type: Schema.Types.Mixed,
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
    band: {
      type: 'String'
    }

  },
  //timestamp that the questionnaire was completed
  {
    timestamps: {
      createdAt: true,
      updatedAt: true
    }
  });

PatientAnswerSchema.pre('save', function(next) {
  this.band = preSave.getBand(this.body, this.rules);
  next();
});

var PatientAnswerModel = mongoose.model('PatientAnswerModel', PatientAnswerSchema, 'patientanswers');
module.exports = PatientAnswerModel;
