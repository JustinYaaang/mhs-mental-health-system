var mongoose = require('../config/config');

var Schema = mongoose.Schema;

var QuestionnaireSchema = new Schema({
	_id: {
		type: 'ObjectId',
    required: true
	},
	question_id: {
		type: Schema.Types.ObjectId,
    ref: 'QuestionModel',
    required: true
	},
	is_root: {
		type: 'Boolean'
	},
	input: {
		node: [{
			type: Schema.Types.ObjectId,
      ref: 'QuestionnaireModel',
		}],
		data: [{
			type: Schema.Types.ObjectId,
      ref: 'QuestionnaireModel',
		}]
	},
	output: {
		node: [{
			type: Schema.Types.ObjectId,
      ref: 'QuestionnaireModel',
		}],
		data: [{
			type: Schema.Types.ObjectId,
      ref: 'QuestionnaireModel',
		}]
	}
});

var QuestionnaireModel = mongoose.model('QuestionnaireModel', QuestionnaireSchema, 'questionnaires' );
module.exports = QuestionnaireModel;
