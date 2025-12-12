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
