const CustomError = require('/../shared-libs/errors/CustomError');
const { getUserFromRequest } = require('../../utils/jwt');

module.exports = function requireAuth(req, res, next) {
  try {
    const payload = getUserFromRequest(req);
    req.user = {
      id: payload.id,
      roleId: payload.roleId,
    };
    next();
  } catch (err) {
    next(new CustomError('UNAUTHORIZED', err.message, 401));
  }
};