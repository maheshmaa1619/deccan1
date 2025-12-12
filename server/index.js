const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/clients', require('./routes/clients'));
app.use('/tasks', require('./routes/tasks'));
app.use('/calls', require('./routes/calls'));
app.use('/payments', require('./routes/payments'));

app.listen(PORT, ()=> console.log('Server running on', PORT));
// create client - simple example (adjust to your DB API)
app.post('/clients', (req, res) => {
  const c = req.body
  if (!c || !c.name) return res.status(400).json({ message: 'Name required' })
  // sample using better-sqlite3 or your DB logic:
  // assume db is a better-sqlite3 instance and you have clients table
  try {
    const stmt = db.prepare('INSERT INTO clients (client_id,name,business,contact_person,phone,email,gstn,address,fee_amount,notes,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,datetime("now"))')
    const info = stmt.run(c.client_id || null, c.name, c.business || '', c.contact_person || '', c.phone || '', c.email || '', c.gstn || '', c.address || '', c.fee_amount || 0, c.notes || '')
    const created = db.prepare('SELECT * FROM clients WHERE id = ?').get(info.lastInsertRowid)
    res.json(created)
  } catch (err) {
    console.error('insert client err', err)
    res.status(500).json({ message: 'DB insert failed' })
  }
})

