PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS clients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id TEXT UNIQUE,
  name TEXT NOT NULL,
  business TEXT,
  contact_person TEXT,
  phone TEXT,
  email TEXT,
  gstn TEXT,
  address TEXT,
  fee_amount REAL,
  notes TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL,
  type TEXT,
  month TEXT,
  due_date TEXT,
  status TEXT DEFAULT 'Not Started',
  remarks TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS calls (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL,
  mode TEXT,
  summary TEXT,
  action_required TEXT,
  deadline TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS payments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL,
  invoice_no TEXT,
  amount REAL,
  paid_on TEXT,
  mode TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

INSERT INTO clients (client_id, name, business, contact_person, phone, email, gstn, address, fee_amount, notes)
VALUES ('C001','ABC Traders','ABC Traders','Rajesh','9876000000','raj@example.com','32ABCDE1234F1Z5','Kottayam, Kerala',1500,'Sample client');

INSERT INTO tasks (client_id, type, month, due_date, status) VALUES (1,'GSTR-1','2025-12','2025-12-11','Not Started');
INSERT INTO tasks (client_id, type, month, due_date, status) VALUES (1,'GSTR-3B','2025-12','2025-12-20','Not Started');
