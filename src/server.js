// api-gateway/server.js
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('../utils/logger');
const routes = require('./routes');
const createProxy = require('./proxies/createProxy');
const createErrorHandler = require('../shared-libs/middlewares/errorHandler');
const gatewayAuthHandler = require('./middleware/gatewayAuthHandler');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());


routes.forEach(route => {
  const auth = gatewayAuthHandler(route);
  logger.info(`[Gateway] Mounting ${route.name} → ${route.path} → ${route.target}`);
  app.use(route.path, auth, createProxy(route.target, route.path, route.rewritePrefix));
});

app.use(createErrorHandler(logger));

app.listen(process.env.PORT, () => {
  logger.info(`🚀 API Gateway running on port ${process.env.PORT}`);
});
