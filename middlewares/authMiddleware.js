const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // استخراج التوكن من الرأس
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(403).json({ message: 'Access denied' });
  }
  
  // التحقق من التوكن
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Access denied' });
    }
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
