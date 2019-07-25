var ClinicianModel = require('../../models/clinician')
var bcrypt = require('bcryptjs');
var enforcer = await require('../config/casbin');

// add admin user
var models = new ClinicianModel({
  email: "uk.nhs.noreply@gmail.com",
  password: "1234"
});
models.save(function(err) {
  await enforcer.addGroupingPolicy(models.id, "ROOT");
});

// questionnaires group
await enforcer.addGroupingPolicy("FORM1", "QUESTIONNAIRE");
await enforcer.addGroupingPolicy("FORM2", "QUESTIONNAIRE");

// answers group
await enforcer.addGroupingPolicy("FORM1ANSWER", "ANSWER");
await enforcer.addGroupingPolicy("FORM2ANSWER", "ANSWER");

// The rights of the admin
await enforcer.addPolicy("ROOT", "trusts", "TRUST", "(GET)|(POST)|(PUT)|(DELETE)");
await enforcer.addPolicy("ROOT", "roles", "TRUSTMANAGER", "(GET)|(POST)|(PUT)|(DELETE)");
await enforcer.addPolicy("ROOT", "questionnaires", "QUESTIONNAIRE", "(GET)|(POST)|(PUT)|(DELETE)");

// The rights of trusts managers
await enforcer.addPolicy("TRUSTMANAGER", "services", "SERVICE", "(GET)|(POST)|(PUT)|(DELETE)");
await enforcer.addPolicy("TRUSTMANAGER", "services", "SERVICEMANAGER", "(GET)|(POST)|(PUT)|(DELETE)");
await enforcer.addPolicy("TRUSTMANAGER", "questionnaires", "QUESTIONNAIRE", "(GET)");

// The rights of services managers and clinicians(step 2 and step 3)
await enforcer.addPolicy("SERVICEMANAGER", "services", "STEP2", "(GET)|(POST)|(PUT)|(DELETE)");
await enforcer.addPolicy("SERVICEMANAGER", "services", "STEP3", "(GET)|(POST)|(PUT)|(DELETE)");
await enforcer.addPolicy("SERVICEMANAGER", "questionnaires", "QUESTIONNAIRE", "(GET)");
await enforcer.addPolicy("SERVICEMANAGER", "patientanswers", "FORM1ANSWER", "(GET)");
await enforcer.addPolicy("STEP2", "questionnaires", "QUESTIONNAIRE", "(GET)");
await enforcer.addPolicy("STEP2", "patientanswers", "FORM2ANSWER", "(GET)");
await enforcer.addPolicy("STEP3", "questionnaires", "QUESTIONNAIRE", "(GET)");
await enforcer.addPolicy("STEP3", "patientanswers", "FORM2ANSWER", "(GET)");

// patients
await enforcer.addPolicy("PATIENT", "questionnaires", "FORM1", "GET");
