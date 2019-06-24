var mongoose = require('../config/config');

var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
	_id: {
		type: 'ObjectId',
    required: true
	},
	title: {
		type: 'String',
    required: true
	},
	type: {
		type: 'String',
    required: true
	},
	choices: {
		type: [
      {
      	title: {
      		type: 'String',
          required: true
      	},
      	value: {
      		type: 'Number',
          required: true
      	}
      }
		]
	}
});

var QuestionModel = mongoose.model('QuestionModel', QuestionSchema, 'questions' );
module.exports = QuestionModel;
