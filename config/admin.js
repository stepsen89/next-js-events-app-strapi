module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'd583f7a939d2c9c8a506f1b56fab8513'),
  },
});
