
import type { AnswerRecord } from "@/types/quiz";

type SaveQuizAttemptInput = {
  quizId: string;
  answers: Pick<
    AnswerRecord,
    "questionId" | "selectedAnswer"
  >[];
  startedAt: string;
  questionOrder: string[];
};

type SaveQuizAttemptResponse = {
  attempt: {
    id: string;
    quizId: string;
    score: number | null;
    totalQuestions: number | null;
    status: string;
  };
};

export async function saveQuizAttempt(
  data: SaveQuizAttemptInput,
): Promise<SaveQuizAttemptResponse> {
  const response = await fetch("/api/quiz-attempts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ?? "Failed to save quiz attempt",
    );
  }

  return result as SaveQuizAttemptResponse;
}
