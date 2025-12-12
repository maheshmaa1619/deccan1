const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req,res)=>{
  const { client_id, type, month, due_date } = req.body;
  const stmt = db.prepare('INSERT INTO tasks (client_id,type,month,due_date) VALUES (?,?,?,?)');
  const info = stmt.run(client_id,type,month,due_date);
  res.json({ id: info.lastInsertRowid });
});

router.patch('/:id', (req,res)=>{
  const { status, remarks } = req.body;
  db.prepare('UPDATE tasks SET status = ?, remarks = ? WHERE id = ?').run(status,remarks,req.params.id);
  res.json({ ok: true });
});

// Bulk create monthly templates for all clients
router.post('/generate-monthly', (req,res)=>{
  const { month } = req.body; // format YYYY-MM
  const clients = db.prepare('SELECT id FROM clients').all();
  const insert = db.prepare('INSERT INTO tasks (client_id,type,month,due_date) VALUES (?,?,?,?)');
  const dueGstr1 = `${month}-11`;
  const dueGstr3B = `${month}-20`;
  db.transaction(()=>{
    for (const c of clients){
      insert.run(c.id,'GSTR-1',month,dueGstr1);
      insert.run(c.id,'GSTR-3B',month,dueGstr3B);
      insert.run(c.id,'Accounting',month,`${month}-25`);
      insert.run(c.id,'Reconciliation',month,`${month}-25`);
      insert.run(c.id,'Fee Collection',month,`${month}-28`);
    }
  })();
  res.json({ ok: true });
});

module.exports = router;
