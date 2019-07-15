exports.index = async (req, res, next) => {
  const enforcer = await require('../config/casbin');
  if ('jwt' in req) {
    await enforcer.getRolesForUser(req.jwt.id).then((id) => {
      if (id == 'PATIENTS') {
        req.query.id = [];
        enforcer.getImplicitPermissionsForUser(req.jwt.id).then((permissions) => {
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
          console.log(req.query);
          next();
        })
      } else if (id == 'MANAGERS'){
        next();
      }
    });

  } else {
    await enforcer.getImplicitPermissionsForUser('PATIENTS').then((permissions) => {
      req.query.id = [];
      for (permission of permissions) {
        if ('questionnaires' == permission[1] && req.method.match(permission[3]) !== null) {
          req.query.id.push(permission[2])
        }
      }
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
      next();
    })
  }
}
