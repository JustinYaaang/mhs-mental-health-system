var mongoose = require('../config/mongoose');

var Schema = mongoose.Schema;

var QuestionnaireSchema = new Schema({
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
});

var QuestionnaireModel = mongoose.model('QuestionnaireModel', QuestionnaireSchema, 'questionnaires');
module.exports = QuestionnaireModel;
