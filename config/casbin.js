var path = require('path');
var mongoDB_URI = require('../config/config')
var casbin = require('casbin');
var MongooseAdapter = require('@elastic.io/casbin-mongoose-adapter');

var model = path.resolve(__dirname, '../config/policyModels.conf');
var policy = path.resolve(__dirname, '../config/policy.csv');

// casbin is an async function
module.exports = (async () => {
  // load mongoose database adapater for casbin
  var adapter = await MongooseAdapter.newAdapter(mongoDB_URI, {
    useNewUrlParser: true
  });
  // load the casbin model and policy from files, database is also supported.
  return enforcer = await casbin.newEnforcer(model, adapter);
})();
