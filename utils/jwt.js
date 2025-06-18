const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const logger = require("./logger");
const publicKey = Buffer.from(process.env.JWT_PUBLIC_KEY_BASE64, 'base64').toString('utf8');


function verifyToken(token) {
  return jwt.verify(token, publicKey, { algorithms: ["RS256"] });
}

/**
 * Extract user info from Authorization header
 */
function getUserFromRequest(req) {
  const authHeader = req.headers["authorization"];
  if (!authHeader?.startsWith("Bearer ")) {
    throw new Error("No token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyToken(token);
    return {
      id: payload.id,
      roleId: payload.roleId,
    };
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      const expiredAt = err.expiredAt?.toISOString?.() || err.expiredAt;
      throw new Error(`Token expired at ${expiredAt}`);
    }

    throw new Error("Invalid token");
  }
}

module.exports = {
  verifyToken,
  getUserFromRequest
};
