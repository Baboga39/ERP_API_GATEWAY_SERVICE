const proxy = require("express-http-proxy");
const logger = require("../../utils/logger");
const CustomError = require("../../shared-libs/errors/CustomError");

module.exports = function createProxy(target, prefixToReplace, rewritePrefix) {
  return proxy(target, {
    timeout: 5000, // ⏱ Timeout 5

    proxyReqPathResolver: (req) =>
      req.originalUrl.replace(prefixToReplace, rewritePrefix),

    proxyReqOptDecorator: (opts) => {
      opts.headers["Content-Type"] = "application/json";
      return opts;
    },

    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      if (proxyRes.statusCode >= 400) {
        const message =
          proxyResData?.toString?.() || "Unknown error from service";
        logger.error(`[Proxy ${prefixToReplace}]`, message);
      }
      return proxyResData;
    },

    proxyErrorHandler: (err, res, next) => {
      const isConnectionError =
        err.code === "ECONNREFUSED" ||
        err.code === "ENOTFOUND" ||
        err.code === "ETIMEDOUT";

      if (isConnectionError) {
        return next(
          new CustomError(
            `Service at ${target} is down or unreachable`,
            503
          )
        );
      }

      return next(
        new CustomError("GATEWAY_ERROR", `Gateway error: ${err.message}`, 500)
      );
    },
  });
};
