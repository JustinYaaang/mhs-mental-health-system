var mongoose = require('../config/config');

var Schema = mongoose.Schema;

var QuestionnaireSchema = new Schema({
	question_id: {
		type: Schema.Types.ObjectId,
    ref: 'QuestionModel',
    required: true
	},
	is_root: {
		type: 'Boolean',
		required: true
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
