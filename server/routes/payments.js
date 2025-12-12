const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req,res)=>{
  const { client_id, invoice_no, amount, paid_on, mode } = req.body;
  const stmt = db.prepare('INSERT INTO payments (client_id,invoice_no,amount,paid_on,mode) VALUES (?,?,?,?,?)');
  const info = stmt.run(client_id,invoice_no,amount,paid_on,mode);
  res.json({ id: info.lastInsertRowid });
});

module.exports = router;
