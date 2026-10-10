import type { QuizAttempt } from "@/types/quiz";

export function calculateQuizScore(attempt: QuizAttempt) {
  const correctCount = attempt.answers.filter(
    (answer) => answer.isCorrect
  ).length;

  const totalAnswered = attempt.answers.length;

  const percentage =
    totalAnswered > 0
      ? Math.round((correctCount / totalAnswered) * 100)
      : 0;

  return {
    correctCount,
    totalAnswered,
    percentage,
  };
}



const STORAGE_KEY = "quiz-progress";

function getActiveQuizKey(quizId: string): string {
return `quiz-active-${quizId}`;
}


export function getQuizHistory(): QuizAttempt[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return [];
    }

    const parsed: unknown = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is QuizAttempt =>
        typeof item === "object" &&
        item !== null &&
        typeof item.id === "string" &&
        typeof item.quizId === "string" &&
        Array.isArray(item.answers) &&
        (item.status === "completed" ||
          item.status === "in-progress")
    );
  } catch {
    return [];
  }
}


export function saveQuizAttempt(attempt: QuizAttempt): void {
  try {
    const history = getQuizHistory();

    // Prevent saving the same attempt more than once.
    if (history.some((item) => item.id === attempt.id)) {
      return;
    }

    const updatedHistory = [...history, attempt];

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedHistory)
    );
  } catch (error) {
    console.error("Failed to save quiz history:", error);
  }
}

export function saveInProgressAttempt(
  attempt: QuizAttempt
): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(
      getActiveQuizKey(attempt.quizId),
      JSON.stringify(attempt)
    );
  } catch (error) {
    console.error("Failed to save quiz progress:", error);
  }
}

export function getInProgressAttempt(
quizId: string
): QuizAttempt | null {
if (typeof window === "undefined") {
return null;
}

try {
const saved = localStorage.getItem(
getActiveQuizKey(quizId)
);

if (!saved) {
  return null;
}

return JSON.parse(saved) as QuizAttempt;


} catch {
return null;
}
}

export function clearInProgressAttempt(
quizId: string
): void {
if (typeof window === "undefined") {
return;
}

localStorage.removeItem(getActiveQuizKey(quizId));
}
export function getLatestCompletedAttempt(
  quizId: string
): QuizAttempt | null {
  const history = getQuizHistory();

  const completedAttempts = history
    .filter(
      (attempt) =>
        attempt.quizId === quizId &&
        attempt.status === "completed"
    )
    .sort(
      (a, b) =>
        new Date(b.completedAt ?? b.startedAt).getTime() -
        new Date(a.completedAt ?? a.startedAt).getTime()
    );

  return completedAttempts[0] ?? null;
}
