module.exports = [
   {
    name: 'auth',
    path: '/v1/auth',
    target: process.env.AUTH_SERVICE_URL,
    rewritePrefix: '/auth',
    authRequired: true,
    protectedPaths: [
      '/v1/auth/me',
      '/v1/auth/session',
      '/v1/auth/roles',
      '/v1/auth/roles/roleWithPermissions',
      '/v1/auth/permissions/all',
      '/v1/auth/permissions/:id',
    ]
  },
     {
    name: 'hr',
    path: '/v1/hr',
    target: process.env.HR_SERVICE_URL,
    rewritePrefix: '/hr',
    authRequired: true,
    protectedPaths: [
      '/v1/hr/:id',
      '/v1/hr/register',
    ]
  },
];
