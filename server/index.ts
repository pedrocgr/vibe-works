import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo.js";
import { initializeDatabase } from "./db/init.js";
import {
  registerTeacher,
  loginTeacher,
  registerStudent,
  loginStudent,
  getTeacherStudents,
} from "./routes/auth.js";

export function createServer() {
  // Initialize database
  initializeDatabase();

  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);

  // Auth routes
  app.post("/api/auth/register-teacher", registerTeacher);
  app.post("/api/auth/login-teacher", loginTeacher);
  app.post("/api/auth/register-student", registerStudent);
  app.post("/api/auth/login-student", loginStudent);
  app.get("/api/auth/teacher/:teacherId/students", getTeacherStudents);

  return app;
}
