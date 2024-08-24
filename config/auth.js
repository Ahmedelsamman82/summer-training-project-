module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key',
    jwtExpire: '7d', // Token expiry time
  };
  