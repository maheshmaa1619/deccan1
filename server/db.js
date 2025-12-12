const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const dbFile = process.env.DATABASE_FILE || path.join(__dirname,'data.db');
const initSql = fs.readFileSync(path.join(__dirname,'migrations.sql'),'utf8');

const exists = fs.existsSync(dbFile);
const db = new Database(dbFile);
if (!exists) {
  db.exec(initSql);
}

module.exports = db;
