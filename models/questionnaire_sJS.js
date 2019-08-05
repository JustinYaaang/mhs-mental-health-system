var mongoose = require('../config/mongoose');

var Schema = mongoose.Schema

var Questionnaire_sJS = new Schema({
  role: {
    type: 'String',
    enum: ['FORM1', 'FORM2']
  },
  is_published: {
    type: 'Boolean',
    required: true
  },
  is_public: {
    type: 'Boolean',
    required: true
  },
  title: {
    type: 'String',
    required: true
  },
  description: {
    type: 'String',
    required: true
  },
  body: {
    type: 'String',
    required: true
  },
  rules: {
    type: Schema.Types.Mixed,
    required: true
  },
});

var Questionnaire_sJSModel = mongoose.model('Questionnaire_sJSModel', Questionnaire_sJS, 'questionnaires_sJS');
module.exports = Questionnaire_sJSModel;
