var mongoose = require('../config/config');

var Schema = mongoose.Schema;

var UserAnswersSchema = new Schema({
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

var UserAnswerModel = mongoose.model('UserAnswerModel', UserAnswersSchema, 'useranswers');
module.exports = UserAnswerModel;
