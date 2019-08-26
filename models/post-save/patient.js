exports.addGroupingPolicy = async (doc) => {
  var enforcer = await require('../../config/casbin');
  await enforcer.addNamedGroupingPolicy("g", String(doc._id), 'PATIENT');
  await enforcer.addNamedGroupingPolicy("g2", String(doc._id), 'PATIENT');
  await enforcer.addPolicy(String(doc._id), "patients", String(doc._id), "(GET)|(PUT)")
}
