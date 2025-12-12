const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req,res)=>{
  const { client_id, mode, summary, action_required, deadline } = req.body;
  const stmt = db.prepare('INSERT INTO calls (client_id,mode,summary,action_required,deadline) VALUES (?,?,?,?,?)');
  const info = stmt.run(client_id,mode,summary,action_required,deadline);
  res.json({ id: info.lastInsertRowid });
});

module.exports = router;
