var mongoose = require('../config/mongoose');

var Schema = mongoose.Schema;

var QuestionNodeSchema = new Schema({
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

var QuestionNodeeModel = mongoose.model('QuestionNodeeModel', QuestionNodeSchema, 'questionnodes' );
module.exports = QuestionNodeeModel;
