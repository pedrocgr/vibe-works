import crypto from "crypto";

export function generateTeacherCode() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = crypto.randomBytes(4).toString("hex").toUpperCase();
  return `PROF${timestamp}${random}`.substring(0, 12);
}

export function generateUserId() {
  return crypto.randomUUID();
}

export function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export function verifyPassword(password, hash) {
  return hashPassword(password) === hash;
}

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password) {
  if (password.length < 6) {
    return { valid: false, error: "Senha deve ter pelo menos 6 caracteres" };
  }
  return { valid: true };
}
