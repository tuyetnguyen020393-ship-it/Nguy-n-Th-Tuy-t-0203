export interface Student {
  id: string;
  name: string;
  classId: string; // e.g. '6A1', '7A1', '8A1', '9A1'
  school: string;
  rank: number;
  score: number;
  maxScore: number;
  submissionsCount: number;
  quote: string;
  badge?: string;
  stars: number;
  note?: string;
  avatarIcon?: string;
}

export interface ClassFilter {
  id: string;
  name: string;
  count: number;
  label: string;
}

export type UserRole = 'student' | 'teacher';

export interface UserSession {
  isLoggedIn: boolean;
  role: UserRole;
  name: string;
  classOrTitle: string;
  username: string;
  avatar: string;
}

export interface HomeworkAssignment {
  id: string;
  title: string;
  subject: string;
  grade: number;
  classId: string;
  deadline: string;
  totalQuestions: number;
  status: 'pending' | 'submitted' | 'graded';
  score?: number;
  description: string;
}

export interface MathSolution {
  question: string;
  topic: string;
  grade: string;
  steps: string[];
  finalAnswer: string;
  teacherNote: string;
}
