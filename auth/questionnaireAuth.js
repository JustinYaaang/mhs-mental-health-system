exports.index = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  var role = []
  while (role.length == 0) {
    await enforcer.getRolesForUser(String(req.jwt.id)).then((result) => {
      role = result;
    });
  }
  if (role == 'PATIENT') {
    var permissions = await getPermissions(req.jwt.id);
    req.query = {
      $and: [{
          _id: {
            $in: permissions
          }
        },
        {
          is_published: true
        }
      ]
    }
  } else {

  }
  next();
}

exports.new = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  if (await enforcer.enforce(req.jwt.id, "questionnaires", req.body.role, req.method) == true) {
    next();
  } else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}

exports.view = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  if (await enforcer.enforce(req.jwt.id, "questionnaires", req.params.id, req.method) == true) {
    next();
  } else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}

exports.update = async (req, res, next) => {
  if (await enforcer.enforce(req.jwt.id, "questionnaires", req.params.id, req.method) == true) {
    next();
  } else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}

exports.delete = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  if (await enforcer.enforce(req.jwt.id, "questionnaires", req.params.id, req.method) == true) {
    next();
  } else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}

exports.add = async (req, res) => {
  var enforcer = await require('../config/casbin');
  if (req.body.is_published) {
    if (req.body.is_public) {
      await enforcer.addGroupingPolicy(req.models.id, "FORM1");
    } else {
      await enforcer.addPolicy(req.body.patient_id, "questionnaires", req.models.id, "GET")
    }
  } else {
  }
}

async function getGrouping(id) {
  var enforcer = await require('../config/casbin');
  var result = [];
  var groupingPolicies = await enforcer.getFilteredGroupingPolicy(1, id);
  if (groupingPolicies.length == 0) {
    return id;
  }
  for (groupingPolicy of groupingPolicies) {
    result.push[await getGrouping(groupingPolicy[0])];
  }
  return result;
}

async function getPermissions(id) {
  //   for (permission of permissions) {
  //     if ('questionnaires' == permission[1] && req.method.match(permission[3]) !== null) {
  //       req.query.id.push(permission[2])
  //     }
  //   }
  var enforcer = await require('../config/casbin');
  var result = [];
  var permissions = await enforcer.getImplicitPermissionsForUser(id);
  for (permission of permissions) {
    var policies = await enforcer.getFilteredGroupingPolicy(1, permission[2]);
    if (policies.length == 0) {
      result.push(permission[2]);
    } else {
      for (policy of policies) {
        result.push(policy[0]);
      }
    }
  }
  return result
}
