import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "../../data/app.db");

export function initializeDatabase() {
  const db = new Database(dbPath);

  db.exec(`
    CREATE TABLE IF NOT EXISTS teachers (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      fullName TEXT NOT NULL,
      password TEXT NOT NULL,
      teacherCode TEXT UNIQUE NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS students (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      fullName TEXT NOT NULL,
      password TEXT NOT NULL,
      teacherCode TEXT NOT NULL,
      teacherId TEXT NOT NULL,
      dailyGoal INTEGER DEFAULT 10,
      photo TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      FOREIGN KEY (teacherId) REFERENCES teachers(id),
      FOREIGN KEY (teacherCode) REFERENCES teachers(teacherCode)
    );

    CREATE INDEX IF NOT EXISTS idx_students_teacherId ON students(teacherId);
    CREATE INDEX IF NOT EXISTS idx_students_teacherCode ON students(teacherCode);
    CREATE INDEX IF NOT EXISTS idx_teachers_teacherCode ON teachers(teacherCode);
  `);

  return db;
}

export function getDatabase() {
  return new Database(dbPath);
}
