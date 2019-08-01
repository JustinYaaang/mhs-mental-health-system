async function initDB() {
  var mongoose = require('../config/mongoose');
  mongoose.connection.dropCollection('casbin_rule', (err, result) => {});

  var enforcer = await require('../config/casbin');

  // questionnaires group
  await enforcer.addNamedGroupingPolicy("g2", "FORM1", "QUESTIONNAIRE");
  await enforcer.addNamedGroupingPolicy("g2", "FORM2", "QUESTIONNAIRE");

  // answers group
  await enforcer.addNamedGroupingPolicy("g2", "FORM1ANSWER", "ANSWER");
  await enforcer.addNamedGroupingPolicy("g2", "FORM2ANSWER", "ANSWER");

  // The rights of the admin
  await enforcer.addPolicy("ADMIN", "organisations", "TRUST", "(GET)|(POST)|(PUT)|(DELETE)");
  await enforcer.addPolicy("ADMIN", "users", "TRUSTMANAGER", "(GET)|(POST)|(PUT)|(DELETE)");
  await enforcer.addPolicy("ADMIN", "questionnaires", "QUESTIONNAIRE", "(GET)|(POST)|(PUT)|(DELETE)");

  // The rights of trusts managers
  await enforcer.addPolicy("TRUSTMANAGER", "organisations", "SERVICE", "(GET)|(POST)|(PUT)|(DELETE)");
  await enforcer.addPolicy("TRUSTMANAGER", "users", "SERVICEMANAGER", "(GET)|(POST)|(PUT)|(DELETE)");
  await enforcer.addPolicy("TRUSTMANAGER", "questionnaires", "QUESTIONNAIRE", "(GET)");

  // The rights of services managers and clinicians(step 2 and step 3)
  await enforcer.addPolicy("SERVICEMANAGER", "users", "STEP2", "(GET)|(POST)|(PUT)|(DELETE)");
  await enforcer.addPolicy("SERVICEMANAGER", "users", "STEP3", "(GET)|(POST)|(PUT)|(DELETE)");
  await enforcer.addPolicy("SERVICEMANAGER", "questionnaires", "QUESTIONNAIRE", "(GET)");
  await enforcer.addPolicy("SERVICEMANAGER", "patientanswers", "FORM1ANSWER", "(GET)");
  await enforcer.addPolicy("SERVICEMANAGER", "patients", "PATIENT", "(GET)");

  await enforcer.addPolicy("STEP2", "questionnaires", "QUESTIONNAIRE", "(GET)");
  await enforcer.addPolicy("STEP2", "patientanswers", "FORM2ANSWER", "(GET)");
  await enforcer.addPolicy("STEP2", "patients", "PATIENT", "(GET)");

  await enforcer.addPolicy("STEP3", "questionnaires", "QUESTIONNAIRE", "(GET)");
  await enforcer.addPolicy("STEP3", "patientanswers", "FORM2ANSWER", "(GET)");
  await enforcer.addPolicy("STEP3", "patients", "PATIENT", "(GET)");

  // patients
  await enforcer.addPolicy("PATIENT", "questionnaires", "FORM1", "(GET)");
  await enforcer.addPolicy("PATIENT", "patientanswers", "FORM1ANSWER", "(GET)|(POST)");
  await enforcer.addPolicy("PATIENT", "patientanswers", "FORM2ANSWER", "(GET)|(POST)");

  // MAP service
  await enforcer.addPolicy("MAP", "organisations", "SERVICE", "(GET)");
}

initDB();
