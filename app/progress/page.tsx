
"use client"; // مشخص کردن اینکه این صفحه در مرورگر اجرا می‌شود.
import { useQuizHistory } from "@/queries/useQuizHistory";
import { quizzes } from "@/data/quizzes";

import ProgressStats from "@/components/progress/ProgressStats"; 
import ProgressChart from "@/components/progress/ProgressChart"; 
import QuizHistory from "@/components/progress/QuizHistory";
import Link from "next/link";
export default function ProgressPage() {
  const { data, isLoading, isError } = useQuizHistory();

  const history = (data?.attempts ?? [])
    .filter((attempt) => attempt.status === "completed")
    .sort(
      (a, b) =>
        new Date(b.completedAt ?? b.startedAt).getTime() -
        new Date(a.completedAt ?? a.startedAt).getTime(),
    );

  const getPercentage = (
    score: number | null,
    totalQuestions: number | null,
  ) => {
    if (score === null || totalQuestions === null || totalQuestions <= 0) {
      return 0;
    }

    return Math.round((score / totalQuestions) * 100);
  };

  const scores = history.map((attempt) =>
    getPercentage(attempt.score, attempt.totalQuestions),
  );

  const averageScore =
    scores.length > 0
      ? Math.round(
          scores.reduce((sum, score) => sum + score, 0) / scores.length,
        )
      : null;

  const latestScore = scores[0] ?? null;

  const chartData = [...history].reverse().map((attempt, index) => ({
    attempt: `Attempt ${index + 1}`,
    percentage: getPercentage(attempt.score, attempt.totalQuestions),
  }));


  return (
    <main className="min-h-screen bg-slate-50 px-5 py-12 text-slate-900 transition-colors duration-300 dark:!bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Your learning journey
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            My Progress
          </h1>
          <p className="mt-3 text-slate-500 dark:text-slate-400">
            Track your results and see how your knowledge grows.
          </p>
        </header>
{isLoading ? (
  <p className="py-10 text-center">Loading progress...</p>
) : isError ? (
  <p className="py-10 text-center text-red-500">
    Failed to load quiz history. Please try again.
  </p>
) : (
  <>
    <ProgressStats
      completedQuizzes={history.length}
      averageScore={averageScore}
      latestScore={latestScore}
    />

    {history.length === 0 ? (
      <section className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-xl font-semibold">
          No quiz attempts yet
        </h2>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Start your first quiz to track your learning progress.
        </p>

        <Link
          href="/quiz/ai-fundamentals"
          className="mt-6 inline-block rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700"
        >
          Start your first quiz
        </Link>
      </section>
    ) : (
      <>
        <ProgressChart data={chartData} />
        <QuizHistory history={history} />
      </>
    )}
  </>
)}
        <ProgressStats
          completedQuizzes={history.length} 
          averageScore={averageScore} 
          latestScore={latestScore} 
        />

        {history.length === 0 ? ( 
          <section className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-semibold">
              No quiz attempts yet
            </h2>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Start your first quiz to track your learning progress.
            </p>

            <Link
              href="/quiz/ai-fundamentals"
              className="mt-6 inline-block rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700"
            >
              Start your first quiz
            </Link>
          </section>
        ) : ( 
          <>
            <ProgressChart data={chartData} /> 
            <QuizHistory history={history} />
          </>
        )}
      </div>
    </main>
  );
}
