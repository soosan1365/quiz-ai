
export type QuizAttemptHistoryItem = {
  id: string;
  quizId: string;
  startedAt: string;
  completedAt: string | null;
  score: number | null;
  totalQuestions: number | null;
  status: string;
};

type QuizHistoryResponse = {
  attempts: QuizAttemptHistoryItem[];
};

export async function getQuizHistory(): Promise<QuizHistoryResponse> {
  const response = await fetch("/api/quiz-attempts");

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message ?? "Failed to fetch quiz history");
  }

  return result as QuizHistoryResponse;
}
