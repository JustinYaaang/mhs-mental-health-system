var mongoose = require('../config/mongoose');

var Schema = mongoose.Schema


var Questionnaire_sJS = new Schema({
    questionnaire_sJS_id: { //the UID
        type: Schema.Types.ObjectId,
        ref: 'Questionnaire_sJSModel',
    },
    title: { //questionnaire's title
        type: 'String',
        required: true
    },
    description: { //questionnaire's description
        type: 'String',
        required: true
    },
    status: { //the status, can be DRAFT, PUBLISHED etc.
        type: 'String',
        required: true
    },
    body: { //the JSON representation of the questionnaire that SurveyJS produces
        type: 'String',
        required: true
    },
});

var Questionnaire_sJSModel = mongoose.model('Questionnaire_sJSModel', Questionnaire_sJS, 'questionnaires_sJS');
module.exports = Questionnaire_sJSModel;