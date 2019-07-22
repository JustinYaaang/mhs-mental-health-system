exports.index = async (req, res, next) => {
  const enforcer = await require('../config/casbin');
  await enforcer.getRolesForUser(req.jwt.id).then((id) => {
    if (id == 'PATIENTS') {
      req.query.id = [];
      enforcer.getImplicitPermissionsForUser(req.jwt.id).then((permissions) => {
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
        console.log(req.query);
        next();
      })
    } else if (id == 'MANAGERS') {
      next();
    }
  });
}
