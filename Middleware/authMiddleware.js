const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key_here'; // use the same secret as in auth.controller

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(401).json({ error: 'Access denied, token missing!' });

  jwt.verify(token, JWT_SECRET, (err, admin) => {
    if (err) return res.status(403).json({ error: 'Token is invalid or expired' });
    req.admin = admin; // attach admin info to request if needed
    next();
  });
}

module.exports = authenticateToken;
