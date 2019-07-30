var OrganisationModel = require('../models/organisation')
var UserModel = require('../models/user')
var organisations = require('./organisations');
var users = require('./users');


async function add_organisation(model) {
  var enforcer = await require('../config/casbin');
  await enforcer.addGroupingPolicy(model._id, model.role);
  await enforcer.addGroupingPolicy(model._id, model.organisation_id);
  await enforcer.addPolicy(model.id, "users", model.id, "(GET)|(PUT)");
  await enforcer.addPolicy(model._id, "organisations", model._id, "GET");
}

async function add_user(model) {
  var enforcer = await require('../config/casbin');
  await enforcer.addGroupingPolicy(model._id, model.organisation_id);
  await enforcer.addPolicy(model._id, "organisations", model.organisation_id, "GET");
  await enforcer.addPolicy(model._id, "users", model._id, "(GET)|(PUT)");
}

var org1 = new OrganisationModel(organisations.org1);
org1.save(async (err) => {
  if(err)
    console.log(err);
  await add_organisation(org1)
  organisations.org2.organisation_id = org1._id;
});

var org2 = new OrganisationModel(organisations.org2);
org2.save(async (err) => {
  if(err)
    console.log(err);
  await add_organisation(org2)
});

users.user1.organisation_id = org1._id;
var user1 = new UserModel(users.user1);
user1.save(async (err) => {
  if(err)
    console.log(err);
  await add_user(user1)
});

users.user2.organisation_id = org2._id;
var user2 = new UserModel(users.user2);
user2.save(async (err) => {
  await add_user(user2)
});

users.user3.organisation_id = org2._id;
var user3 = new UserModel(users.user3);
user3.save(async (err) => {
  await add_user(user3)
});

users.user4.organisation_id = org2._id;
var user4 = new UserModel(users.user4);
user4.save(async (err) => {
  await add_user(user4)
});
