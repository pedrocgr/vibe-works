import { getDatabase } from "../db/init.js";
import {
  generateTeacherCode,
  generateUserId,
  hashPassword,
  verifyPassword,
  validateEmail,
  validatePassword,
} from "../utils/auth.js";

// Teacher Registration
export const registerTeacher = (req, res) => {
  const db = getDatabase();

  try {
    const { email, fullName, password, confirmPassword } = req.body;

    // Validation
    if (!email || !fullName || !password) {
      return res.status(400).json({
        success: false,
        message: "Campos obrigatórios faltando",
        error: "Missing required fields",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Email inválido",
        error: "Invalid email format",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Senhas não coincidem",
        error: "Passwords do not match",
      });
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return res.status(400).json({
        success: false,
        message: passwordValidation.error || "Senha inválida",
        error: "Invalid password",
      });
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
      });
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
    });
  } catch (error) {
    console.error("Teacher registration error:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao cadastrar professor",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Teacher Login
export const loginTeacher = (req, res) => {
  const db = getDatabase();

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email e senha são obrigatórios",
        error: "Missing credentials",
      });
    }

    const teacher = db
      .prepare("SELECT * FROM teachers WHERE email = ?")
      .get(email);

    if (!teacher || !verifyPassword(password, teacher.password)) {
      return res.status(401).json({
        success: false,
        message: "Email ou senha incorretos",
        error: "Invalid credentials",
      });
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
    });
  } catch (error) {
    console.error("Teacher login error:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao fazer login",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Student Registration
export const registerStudent = (req, res) => {
  const db = getDatabase();

  try {
    const {
      email,
      fullName,
      password,
      confirmPassword,
      teacherCode,
      dailyGoal,
    } = req.body;

    // Validation
    if (!email || !fullName || !password || !teacherCode) {
      return res.status(400).json({
        success: false,
        message: "Campos obrigatórios faltando",
        error: "Missing required fields",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Email inválido",
        error: "Invalid email format",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Senhas não coincidem",
        error: "Passwords do not match",
      });
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return res.status(400).json({
        success: false,
        message: passwordValidation.error || "Senha inválida",
        error: "Invalid password",
      });
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
      });
    }

    // Check if teacher code exists
    const teacher = db
      .prepare("SELECT id FROM teachers WHERE teacherCode = ?")
      .get(teacherCode);

    if (!teacher) {
      return res.status(400).json({
        success: false,
        message: "Código do professor inválido",
        error: "Invalid teacher code",
      });
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
    });
  } catch (error) {
    console.error("Student registration error:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao cadastrar aluno",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Student Login
export const loginStudent = (req, res) => {
  const db = getDatabase();

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email e senha são obrigatórios",
        error: "Missing credentials",
      });
    }

    const student = db
      .prepare("SELECT * FROM students WHERE email = ?")
      .get(email);

    if (!student || !verifyPassword(password, student.password)) {
      return res.status(401).json({
        success: false,
        message: "Email ou senha incorretos",
        error: "Invalid credentials",
      });
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
    });
  } catch (error) {
    console.error("Student login error:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao fazer login",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get Students for Teacher
export const getTeacherStudents = (req, res) => {
  const db = getDatabase();

  try {
    const { teacherId } = req.params;

    if (!teacherId) {
      return res.status(400).json({
        success: false,
        error: "Missing teacher ID",
      });
    }

    const students = db
      .prepare(
        `SELECT id, email, fullName, dailyGoal, createdAt FROM students 
         WHERE teacherId = ? 
         ORDER BY createdAt DESC`,
      )
      .all(teacherId);

    res.status(200).json({
      success: true,
      students: students.map((s) => ({
        id: s.id,
        email: s.email,
        fullName: s.fullName,
        dailyGoal: s.dailyGoal,
        createdAt: s.createdAt,
      })),
    });
  } catch (error) {
    console.error("Get students error:", error);
    res.status(500).json({
      success: false,
      students: [],
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
