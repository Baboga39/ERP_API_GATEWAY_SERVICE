// shared-libs/middlewares/requirePermissions.js

const CustomError = require('../errors/CustomError');


function requirePermissions(requiredPermissions = []) {
  return (req, res, next) => {
    const rawPerms = req.headers['x-permissions'];
    if (!rawPerms) {
      return next(new CustomError('MISSING_PERMISSIONS_HEADER', 403, 'Missing x-permissions header'));
    }
    const role = req.headers['x-role-id']
    if(role === '5') {
      return next(); // Admins are exempt from permission checks
    }

    const userPermissions = rawPerms.split(',').map(p => p.trim());

    const hasAtLeastOnePermission = requiredPermissions.some(p => userPermissions.includes(p));

    if (!hasAtLeastOnePermission && role !== '5') {
      return next(
        new CustomError(
          'PERMISSION_DENIED',
          403,
          'Required admin role to access this resource.'
        )
      );
    } 
    
    if (!hasAtLeastOnePermission) {
      return next(
        new CustomError(
          'PERMISSION_DENIED',
          403,
          `Required at least one of: [${requiredPermissions.join(', ')}]`
        )
      );
    } 

    next();
  };
}

module.exports = requirePermissions;
