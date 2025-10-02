require("dotenv").config();
const Database = require("better-sqlite3");

const dbFile = process.env.DB_FILE || "./tasks.db";
const db = new Database(dbFile);

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT CHECK(status IN ('todo', 'in-progress', 'done')) DEFAULT 'todo',
    completed INTEGER DEFAULT 0
  )
`
).run();

module.exports = db;
