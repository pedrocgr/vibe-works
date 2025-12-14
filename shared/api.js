/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

export const DemoResponseType = {
  message: String,
};

export const TeacherRegistrationRequestType = {
  email: String,
  fullName: String,
  password: String,
  confirmPassword: String,
};

export const TeacherRegistrationResponseType = {
  success: Boolean,
  message: String,
  teacher: {
    id: String,
    email: String,
    fullName: String,
    teacherCode: String,
  },
  error: String,
};

export const TeacherLoginRequestType = {
  email: String,
  password: String,
};

export const TeacherLoginResponseType = {
  success: Boolean,
  message: String,
  teacher: {
    id: String,
    email: String,
    fullName: String,
    teacherCode: String,
  },
  token: String,
  error: String,
};

export const StudentRegistrationRequestType = {
  fullName: String,
  email: String,
  password: String,
  confirmPassword: String,
  teacherCode: String,
  dailyGoal: Number,
  photo: String,
};

export const StudentRegistrationResponseType = {
  success: Boolean,
  message: String,
  student: {
    id: String,
    email: String,
    fullName: String,
    teacherCode: String,
  },
  error: String,
};

export const StudentLoginRequestType = {
  email: String,
  password: String,
};

export const StudentLoginResponseType = {
  success: Boolean,
  message: String,
  student: {
    id: String,
    email: String,
    fullName: String,
    teacherCode: String,
  },
  token: String,
  error: String,
};

export const TeacherStudentsResponseType = {
  success: Boolean,
  students: [
    {
      id: String,
      email: String,
      fullName: String,
      dailyGoal: Number,
      createdAt: String,
    },
  ],
  error: String,
};
