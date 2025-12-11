import { RequestHandler } from "express";
import { getDatabase } from "../db/init.js";
import {
  generateTeacherCode,
  generateUserId,
  hashPassword,
  verifyPassword,
  validateEmail,
  validatePassword,
} from "../utils/auth.js";
import {
  TeacherRegistrationRequest,
  TeacherRegistrationResponse,
  TeacherLoginRequest,
  TeacherLoginResponse,
  StudentRegistrationRequest,
  StudentRegistrationResponse,
  StudentLoginRequest,
  StudentLoginResponse,
  TeacherStudentsResponse,
} from "@shared/api";

// Teacher Registration
export const registerTeacher: RequestHandler = (req, res) => {
  const db = getDatabase();

  try {
    const { email, fullName, password, confirmPassword } =
      req.body as TeacherRegistrationRequest;

    // Validation
    if (!email || !fullName || !password) {
      return res.status(400).json({
        success: false,
        message: "Campos obrigatórios faltando",
        error: "Missing required fields",
      } as TeacherRegistrationResponse);
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Email inválido",
        error: "Invalid email format",
      } as TeacherRegistrationResponse);
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Senhas não coincidem",
        error: "Passwords do not match",
      } as TeacherRegistrationResponse);
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return res.status(400).json({
        success: false,
        message: passwordValidation.error || "Senha inválida",
        error: "Invalid password",
      } as TeacherRegistrationResponse);
    }

    // Check if email already exists
    const existingTeacher = db
      .prepare("SELECT id FROM teachers WHERE email = ?")
      .get(email);
    if (existingTeacher) {
      return res.status(400).json({
        success: false,
        message: "Email já cadastrado",
        error: "Email already exists",
      } as TeacherRegistrationResponse);
    }

    // Create teacher
    const teacherId = generateUserId();
    const teacherCode = generateTeacherCode();
    const hashedPassword = hashPassword(password);
    const now = new Date().toISOString();

    db.prepare(
      `INSERT INTO teachers (id, email, fullName, password, teacherCode, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    ).run(teacherId, email, fullName, hashedPassword, teacherCode, now, now);

    res.status(201).json({
      success: true,
      message: "Professor cadastrado com sucesso",
      teacher: {
        id: teacherId,
        email,
        fullName,
        teacherCode,
      },
    } as TeacherRegistrationResponse);
  } catch (error) {
    console.error("Teacher registration error:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao cadastrar professor",
      error: error instanceof Error ? error.message : "Unknown error",
    } as TeacherRegistrationResponse);
  }
};

// Teacher Login
export const loginTeacher: RequestHandler = (req, res) => {
  const db = getDatabase();

  try {
    const { email, password } = req.body as TeacherLoginRequest;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email e senha são obrigatórios",
        error: "Missing credentials",
      } as TeacherLoginResponse);
    }

    const teacher = db
      .prepare("SELECT * FROM teachers WHERE email = ?")
      .get(email) as any;

    if (!teacher || !verifyPassword(password, teacher.password)) {
      return res.status(401).json({
        success: false,
        message: "Email ou senha incorretos",
        error: "Invalid credentials",
      } as TeacherLoginResponse);
    }

    res.status(200).json({
      success: true,
      message: "Login realizado com sucesso",
      teacher: {
        id: teacher.id,
        email: teacher.email,
        fullName: teacher.fullName,
        teacherCode: teacher.teacherCode,
      },
    } as TeacherLoginResponse);
  } catch (error) {
    console.error("Teacher login error:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao fazer login",
      error: error instanceof Error ? error.message : "Unknown error",
    } as TeacherLoginResponse);
  }
};

// Student Registration
export const registerStudent: RequestHandler = (req, res) => {
  const db = getDatabase();

  try {
    const {
      email,
      fullName,
      password,
      confirmPassword,
      teacherCode,
      dailyGoal,
    } = req.body as StudentRegistrationRequest;

    // Validation
    if (!email || !fullName || !password || !teacherCode) {
      return res.status(400).json({
        success: false,
        message: "Campos obrigatórios faltando",
        error: "Missing required fields",
      } as StudentRegistrationResponse);
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Email inválido",
        error: "Invalid email format",
      } as StudentRegistrationResponse);
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Senhas não coincidem",
        error: "Passwords do not match",
      } as StudentRegistrationResponse);
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return res.status(400).json({
        success: false,
        message: passwordValidation.error || "Senha inválida",
        error: "Invalid password",
      } as StudentRegistrationResponse);
    }

    // Check if email already exists
    const existingStudent = db
      .prepare("SELECT id FROM students WHERE email = ?")
      .get(email);
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Email já cadastrado",
        error: "Email already exists",
      } as StudentRegistrationResponse);
    }

    // Check if teacher code exists
    const teacher = db
      .prepare("SELECT id FROM teachers WHERE teacherCode = ?")
      .get(teacherCode) as any;

    if (!teacher) {
      return res.status(400).json({
        success: false,
        message: "Código do professor inválido",
        error: "Invalid teacher code",
      } as StudentRegistrationResponse);
    }

    // Create student
    const studentId = generateUserId();
    const hashedPassword = hashPassword(password);
    const now = new Date().toISOString();

    db.prepare(
      `INSERT INTO students (id, email, fullName, password, teacherCode, teacherId, dailyGoal, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ).run(
      studentId,
      email,
      fullName,
      hashedPassword,
      teacherCode,
      teacher.id,
      dailyGoal || 10,
      now,
      now,
    );

    res.status(201).json({
      success: true,
      message: "Aluno cadastrado com sucesso",
      student: {
        id: studentId,
        email,
        fullName,
        teacherCode,
      },
    } as StudentRegistrationResponse);
  } catch (error) {
    console.error("Student registration error:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao cadastrar aluno",
      error: error instanceof Error ? error.message : "Unknown error",
    } as StudentRegistrationResponse);
  }
};

// Student Login
export const loginStudent: RequestHandler = (req, res) => {
  const db = getDatabase();

  try {
    const { email, password } = req.body as StudentLoginRequest;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email e senha são obrigatórios",
        error: "Missing credentials",
      } as StudentLoginResponse);
    }

    const student = db
      .prepare("SELECT * FROM students WHERE email = ?")
      .get(email) as any;

    if (!student || !verifyPassword(password, student.password)) {
      return res.status(401).json({
        success: false,
        message: "Email ou senha incorretos",
        error: "Invalid credentials",
      } as StudentLoginResponse);
    }

    res.status(200).json({
      success: true,
      message: "Login realizado com sucesso",
      student: {
        id: student.id,
        email: student.email,
        fullName: student.fullName,
        teacherCode: student.teacherCode,
      },
    } as StudentLoginResponse);
  } catch (error) {
    console.error("Student login error:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao fazer login",
      error: error instanceof Error ? error.message : "Unknown error",
    } as StudentLoginResponse);
  }
};

// Get Students for Teacher
export const getTeacherStudents: RequestHandler = (req, res) => {
  const db = getDatabase();

  try {
    const { teacherId } = req.params;

    if (!teacherId) {
      return res.status(400).json({
        success: false,
        error: "Missing teacher ID",
      } as TeacherStudentsResponse);
    }

    const students = db
      .prepare(
        `SELECT id, email, fullName, dailyGoal, createdAt FROM students 
         WHERE teacherId = ? 
         ORDER BY createdAt DESC`,
      )
      .all(teacherId) as any[];

    res.status(200).json({
      success: true,
      students: students.map((s) => ({
        id: s.id,
        email: s.email,
        fullName: s.fullName,
        dailyGoal: s.dailyGoal,
        createdAt: s.createdAt,
      })),
    } as TeacherStudentsResponse);
  } catch (error) {
    console.error("Get students error:", error);
    res.status(500).json({
      success: false,
      students: [],
      error: error instanceof Error ? error.message : "Unknown error",
    } as TeacherStudentsResponse);
  }
};
