async function add_patient(model) {
  var enforcer = await require('../config/casbin');
  await enforcer.addNamedGroupingPolicy("g", model._id, 'PATIENT');
  await enforcer.addNamedGroupingPolicy("g2", model._id, 'PATIENT');
}

async function add_question(model) {
  var enforcer = await require('../config/casbin');
  await enforcer.addPolicy(String(model._id), "questionnaires", String(model._id), "(GET)")
  await enforcer.addNamedGroupingPolicy("g2", String(model._id), "QUESTIONNAIRE");
  if (model.is_public) {
    await enforcer.addNamedGroupingPolicy("g2", String(req.models._id), "FORM1");
  }
}

async function add_answer(model) {
  var enforcer = await require('../config/casbin');
  await enforcer.addNamedGroupingPolicy("g2", model._id, model.role);
  await enforcer.addPolicy(String(model.patient_id), "patientanswers", String(model._id), "(GET)");
  await enforcer.addPolicy(String(model._id), "patientanswers", String(model._id), "(GET)")
}


async function create() {
  var mongoose = require('../config/mongoose');
  mongoose.connection.dropCollection('patients', (err, result) => {});
  mongoose.connection.dropCollection('questionnaires_sJS', (err, result) => {});
  mongoose.connection.dropCollection('patientanswers', (err, result) => {});

  var OrganisationModel = require('../models/organisation');
  var PatientModel = require('../models/patient')
  var Questionnaire_sJSModel = require('../models/questionnaire_sJS')
  var PatientAnswerModel = require('../models/patientanswer')

  var patients = require('./patients');
  var questions = require('./questions');
  var answers = require('./answers');

  var model = await OrganisationModel.findOne({
    role: "SERVICE"
  });
  patients.p1.service_id = model._id;
  patients.p2.service_id = model._id;
  answers.a1.service_id = model._id;
  answers.a2.service_id = model._id;
  answers.a3.service_id = model._id;

  var p1 = new PatientModel(patients.p1);
  p1.save(async (err) => {
    if (err)
      console.log(err);
    await add_patient(p1)
  });

  var p2 = new PatientModel(patients.p2);
  p2.save(async (err) => {
    if (err)
      console.log(err);
    await add_patient(p2)
  });

  var q1 = new Questionnaire_sJSModel(questions.q1);
  q1.save(async (err) => {
    if (err)
      console.log(err);
    await add_question(q1)
  });

  var q2 = new Questionnaire_sJSModel(questions.q2);
  q2.save(async (err) => {
    if (err)
      console.log(err);
    await add_question(q2)
  });

  var q3 = new Questionnaire_sJSModel(questions.q3);
  q3.save(async (err) => {
    if (err)
      console.log(err);
    await add_question(q3)
  });

  answers.a1.patient_id = p1._id;
  var a1 = new PatientAnswerModel(answers.a1);
  a1.save(async (err) => {
    if (err)
      console.log(err);
    await add_answer(a1)
  });

  answers.a2.patient_id = p1._id;
  var a2 = new PatientAnswerModel(answers.a2);
  a2.save(async (err) => {
    if (err)
      console.log(err);
    await add_answer(a2)
  });

  answers.a3.patient_id = p2._id;
  var a3 = new PatientAnswerModel(answers.a3);
  a3.save(async (err) => {
    if (err)
      console.log(err);
    await add_answer(a3)
  });

}

create();
