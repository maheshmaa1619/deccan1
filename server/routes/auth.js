const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'secret123';

// Very simple login for demo — replace with real secure users in production
router.post('/login', (req,res)=>{
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password'){
    const token = jwt.sign({ username }, SECRET, { expiresIn: '8h' });
    return res.json({ token });
  }
  res.status(401).json({ error: 'Invalid creds' });
});

module.exports = router;
