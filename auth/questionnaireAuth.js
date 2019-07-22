exports.index = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  await enforcer.getRolesForUser(req.jwt.id).then((role) => {
    if (role == 'PATIENTS') {
      enforcer.getImplicitPermissionsForUser(req.jwt.id).then((permissions) => {
        req.query.id = [];
        for (permission of permissions) {
          if ('questionnaires' == permission[1] && req.method.match(permission[3]) !== null) {
            req.query.id.push(permission[2])
          }
        }
        console.log(req.query.id);
        req.query = {
          $and: [{
              _id: {
                $in: req.query.id
              }
            },
            {
              is_published: true
            }
          ]
        }
      })
    } else if (role == 'ROOT') {
    } else if (role == 'MANAGERS') {
    } else if (role == 'CLINICIANS') {
    }
    next();
  });
}
