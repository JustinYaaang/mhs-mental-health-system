exports.index = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  var subjects = await enforcer.getAllSubjects();
  var result = [];
  // console.log("All subjects: ", subjects, " <= questionAuth");
  for (subject of subjects) {
    if (await enforcer.enforce(req.jwt.id, "patients", subject, req.method)) {
      if (req.jwt.id != subject) {
        if (mongoose.Types.ObjectId.isValid(subject)) {
          result.push(subject);
        }
      }
    }
  }
  req.newquery = {
    _id: {
      $in: result
    }
  };
  console.log(req.query, " <= patientquestionnaireAuth");

  next();
}

exports.new = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  if (await enforcer.enforce(req.jwt.id, "patientquestionnaire", "FORM2", req.method)) {} else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}

exports.add = async (req, res) => {
  var enforcer = await require('../config/casbin');
  await enforcer.addNamedGroupingPolicy("g2", String(req.models._id), 'FORM2');
  await enforcer.addPolicy(String(req.models._id), "patientquestionnaire", String(req.models._id), "(GET)")
  await enforcer.addPolicy(String(req.models.patient_id), "patientquestionnaire", String(req.models.questionnaire_id), "(GET)")
  res.status(200).send({
    message: 'Added',
  });
}

exports.delete = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  if (await enforcer.enforce(req.jwt.id, "patientquestionnaire", "FORM2", req.method)) {} else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}

exports.remove = async (req, res) => {
  var enforcer = await require('../config/casbin');
  await enforcer.removePolicy(String(req.body.patient_id), "patientquestionnaire", String(req.body.questionnaire_id), "(GET)")
}
