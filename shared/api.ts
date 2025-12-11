/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

export interface DemoResponse {
  message: string;
}

// Teacher Registration Request/Response
export interface TeacherRegistrationRequest {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
}

export interface TeacherRegistrationResponse {
  success: boolean;
  message: string;
  teacher?: {
    id: string;
    email: string;
    fullName: string;
    teacherCode: string;
  };
  error?: string;
}

// Teacher Login Request/Response
export interface TeacherLoginRequest {
  email: string;
  password: string;
}

export interface TeacherLoginResponse {
  success: boolean;
  message: string;
  teacher?: {
    id: string;
    email: string;
    fullName: string;
    teacherCode: string;
  };
  token?: string;
  error?: string;
}

// Student Registration Request/Response
export interface StudentRegistrationRequest {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  teacherCode: string;
  dailyGoal?: number;
  photo?: string;
}

export interface StudentRegistrationResponse {
  success: boolean;
  message: string;
  student?: {
    id: string;
    email: string;
    fullName: string;
    teacherCode: string;
  };
  error?: string;
}

// Student Login Request/Response
export interface StudentLoginRequest {
  email: string;
  password: string;
}

export interface StudentLoginResponse {
  success: boolean;
  message: string;
  student?: {
    id: string;
    email: string;
    fullName: string;
    teacherCode: string;
  };
  token?: string;
  error?: string;
}

// Get Students for Teacher
export interface TeacherStudentsResponse {
  success: boolean;
  students: Array<{
    id: string;
    email: string;
    fullName: string;
    dailyGoal: number;
    createdAt: string;
  }>;
  error?: string;
}
