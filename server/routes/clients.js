const express = require('express');
const router = express.Router();
const db = require('../db');
const PDF = require('../utils/pdf');

router.get('/', (req,res)=>{
  const rows = db.prepare('SELECT * FROM clients ORDER BY name').all();
  res.json(rows);
});

router.get('/:id', (req,res)=>{
  const client = db.prepare('SELECT * FROM clients WHERE id = ?').get(req.params.id);
  if (!client) return res.status(404).json({error:'Not found'});
  const tasks = db.prepare('SELECT * FROM tasks WHERE client_id = ? ORDER BY due_date').all(req.params.id);
  const calls = db.prepare('SELECT * FROM calls WHERE client_id = ? ORDER BY created_at DESC').all(req.params.id);
  const payments = db.prepare('SELECT * FROM payments WHERE client_id = ? ORDER BY created_at DESC').all(req.params.id);
  res.json({ client, tasks, calls, payments });
});

router.post('/', (req,res)=>{
  const stmt = db.prepare(`INSERT INTO clients (client_id,name,business,contact_person,phone,email,gstn,address,fee_amount,notes) VALUES (?,?,?,?,?,?,?,?,?,?)`);
  const info = stmt.run(req.body.client_id,req.body.name,req.body.business,req.body.contact_person,req.body.phone,req.body.email,req.body.gstn,req.body.address,req.body.fee_amount,req.body.notes);
  res.json({ id: info.lastInsertRowid });
});

router.get('/:id/export', (req,res)=>{
  const client = db.prepare('SELECT * FROM clients WHERE id = ?').get(req.params.id);
  if (!client) return res.status(404).send('Not found');
  const tasks = db.prepare('SELECT * FROM tasks WHERE client_id = ?').all(req.params.id);
  const calls = db.prepare('SELECT * FROM calls WHERE client_id = ?').all(req.params.id);
  const payments = db.prepare('SELECT * FROM payments WHERE client_id = ?').all(req.params.id);
  res.setHeader('Content-Type','application/pdf');
  res.setHeader('Content-Disposition',`attachment; filename="client_${client.client_id}.pdf"`);
  PDF.generateClientPDF({client,tasks,calls,payments}, res);
});

module.exports = router;
