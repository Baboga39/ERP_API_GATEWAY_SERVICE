const { match } = require('path-to-regexp');
const { getUserFromRequest } = require('../../utils/jwt');
const CustomError = require('../../shared-libs/errors/CustomError');
const logger = require('../../utils/logger');
const redis = require('../../shared-libs/utils/redis.config');
const axios = require('axios');

function gatewayAuthHandler(routeConfig) {
  const { authRequired = false, protectedPaths = [] } = routeConfig;
  const matchers = protectedPaths.map(pattern => match(pattern, { decode: decodeURIComponent }));

  return async (req, res, next) => {
    if (!authRequired) return next();

    const pathToCheck = routeConfig.path + req.path;

    const matched = matchers.some(matcher => {
      const result = matcher(pathToCheck);
      logger.debug(`[Gateway] Check path=${pathToCheck} matched=${!!result}`);
      return !!result;
    });

    if (!matched) return next();

    try {
      const user = getUserFromRequest(req);
      logger.info(`Authenticated user ${user.id} with role ${user.roleId}`);

      req.headers['x-user-id'] = user.id;
      req.headers['x-role-id'] = user.roleId;

      const cacheKey = `role:${user.roleId}:permissions`;
      let permissions = await redis.get(cacheKey);

      if (!permissions) {
        logger.debug(`🔍 Cache miss for ${cacheKey}, fetching from auth service...`);
        logger.debug(`Requesting permissions for role ${user.roleId} from auth service`);
        const resp = await axios.get(`${process.env.AUTH_SERVICE_URL}/auth/permissions/${user.roleId}`);
        permissions = resp.data.data;

        await redis.set(cacheKey, JSON.stringify(permissions), { EX: 3600 });
      } else {
        permissions = JSON.parse(permissions);
      }

      req.headers['x-permissions'] = permissions.join(',');

      next();
    } catch (err) {
      logger.error(`❌ Auth handler error: ${err.message}`);
      next(new CustomError('Invalid or missing token', 401, err.message));
    }
  };
}

module.exports = gatewayAuthHandler;
