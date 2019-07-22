var mongoose = require('../config/mongoose');

var Schema = mongoose.Schema;

var QuestionnaireSchema = new Schema({
	questionnode_id: [{
		type: Schema.Types.ObjectId,
    ref: 'QuestionnodeModel',
	}],
	is_published: {
		type: 'Boolean',
		required: true
	}
});

var QuestionnaireModel = mongoose.model('QuestionnaireModel', QuestionnaireSchema, 'questionnaires' );
module.exports = QuestionnaireModel;
