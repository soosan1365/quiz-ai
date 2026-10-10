
"use client"; // مشخص کردن اینکه این صفحه در مرورگر اجرا می‌شود.

import { useEffect, useState } from "react"; // وارد کردن هوک‌های React
import Link from "next/link"; // ساخت لینک داخلی Next.js

import {
  getCompletedQuizHistory,
  getQuizChartData,
  getProgressStats,
} from "@/lib/progress"; 

import type { QuizAttempt } from "@/types/quiz"; 

import ProgressStats from "@/components/progress/ProgressStats"; 
import ProgressChart from "@/components/progress/ProgressChart"; 
import QuizHistory from "@/components/progress/QuizHistory";

export default function ProgressPage() { 
  const [history, setHistory] = useState<QuizAttempt[]>([]); 

  useEffect(() => { 
    setHistory(getCompletedQuizHistory()); 
  }, []); 

  const chartData = getQuizChartData(history); 
  const { averageScore, latestScore } = getProgressStats(history);

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
