var mongoose = require('../config/config');

var Schema = mongoose.Schema


var Questionnaire_sJS = new Schema({
    questionnaire_sJS_id: {
		type: Schema.Types.ObjectId,
    ref: 'Questionnaire_sJSModel',
	},
    title: {
        type: 'String',
        required: true
    },
    description: {
        type: 'String',
        required: true
    },
    status: {
        type: 'String',
        required: true
    },
    body: {
        type: 'String',
        required: true
    },
});

var Questionnaire_sJSModel = mongoose.model('Questionnaire_sJSModel', Questionnaire_sJS, 'questionnaires_sJS');
module.exports = Questionnaire_sJSModel;