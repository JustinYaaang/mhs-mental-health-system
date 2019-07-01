var mongoose = require('../config/config');

var Schema = mongoose.Schema;

var QuestionnaireSchema = new Schema({
	questionnode_id: [{
		type: Schema.Types.ObjectId,
    ref: 'QuestionnaireModel',
    required: true
	}],
	patient_id: [{
		type: Schema.Types.ObjectId,
    ref: 'QuestionModel',
    required: true
	}],
  is_public: {
		type: 'Boolean',
		required: true
	}
});

var QuestionnaireModel = mongoose.model('QuestionnaireModel', QuestionnaireSchema, 'questionaires' );
module.exports = QuestionnaireModel;
