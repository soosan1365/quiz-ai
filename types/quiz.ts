export type Question = {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

export type Quiz = {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate";
  questions: Question[];
};

export type AnswerRecord = {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
};

export type QuizAttempt = {
  id: string;
  quizId: string;
  startedAt: string;
  completedAt?: string;
  currentQuestionIndex: number;
  answers: AnswerRecord[];
  status: "in-progress" | "completed";
  questionOrder: string[];
};