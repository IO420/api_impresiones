const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const envConfig = require('../envConfigurations/EnvConfigurations');

router.get('/', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ valid: false, message: 'No token or bad format' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, envConfig.jwtSecret);
    return res.json({ valid: true, user: decoded });
  } catch (err) {
    console.error('Token verification error:', err.message);
    return res.status(401).json({ valid: false, message: 'Invalid token' });
  }
});

module.exports = router;
