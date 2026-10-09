
import Link from "next/link";
import type { Quiz, AnswerRecord } from "@/types/quiz";

type QuizResultsProps = {
  quiz: Quiz;
  answers: AnswerRecord[];
  onRetake: () => void;
};
/**
 * Displays the final quiz score and review options.
 */
export default function QuizResults({
  quiz,
  answers,
  onRetake,
}: QuizResultsProps) {
  const correctCount = answers.filter((answer) => answer.isCorrect).length;
  const percentage = Math.round(
    (correctCount / quiz.questions.length) * 100,
  );

  const performanceMessage =
    percentage >= 80
      ? "Excellent work! You have a strong understanding of this topic."
      : percentage >= 60
        ? "Good effort! A little more practice will help you improve."
        : "Keep practicing! Review the explanations and try again.";

  const missedAnswers = answers.filter((answer) => !answer.isCorrect);

  return (
    <main className="mx-auto max-w-3xl p-8 text-center">
      <h1 className="text-3xl font-bold">Quiz Completed!</h1>

      <p className="mt-4">
        Your score: {correctCount} / {quiz.questions.length}
      </p>

      <p className="mt-2">Percentage: {percentage}%</p>

      <p className="mt-3 text-slate-600 dark:text-slate-300">
        {performanceMessage}
      </p>

      <div className="mt-8 text-left">
        <h2 className="mb-4 text-xl font-bold">Review Your Answers</h2>

        {missedAnswers.map((answer) => {
          const missedQuestion = quiz.questions.find(
            (item) => item.id === answer.questionId,
          );

          if (!missedQuestion) return null;

          return (
            <div
              key={answer.questionId}
              className="mb-4 rounded-xl border border-red-200 p-4 dark:border-red-900"
            >
              <p className="font-semibold">{missedQuestion.text}</p>

              <p className="mt-2 text-red-600 dark:text-red-400">
                Your answer: {missedQuestion.options[answer.selectedAnswer]}
              </p>

              <p className="mt-1 text-green-700 dark:text-green-400">
                Correct answer:{" "}
                {missedQuestion.options[missedQuestion.correctAnswer]}
              </p>

              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {missedQuestion.explanation}
              </p>
            </div>
          );
        })}

        {missedAnswers.length === 0 && (
          <p className="text-green-700 dark:text-green-400">
            Perfect score! You answered every question correctly.
          </p>
        )}
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <button
          onClick={onRetake}
          className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Retake Quiz
        </button>

        <Link
          href="/"
          className="rounded-xl border border-blue-600 bg-white px-6 py-3 font-medium text-blue-600 transition hover:bg-blue-50 dark:border-blue-400 dark:bg-slate-900 dark:text-blue-400 dark:hover:bg-slate-800"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
// quiz: اطلاعات آزمون و سؤال‌ها

// answers: پاسخ‌های ثبت‌شده‌ی کاربر

// onRetake: تابعی که با کلیک روی Retake Quiz از کامپوننت والد دریافت می‌کنه