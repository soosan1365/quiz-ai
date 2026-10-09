"use client";

import { useEffect, useState } from "react";
import {
  calculateQuizScore,
  getQuizHistory,
} from "@/lib/progress";import type { QuizAttempt } from "@/types/quiz";
import Link from "next/link";
import { quizzes } from "@/data/quizzes";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ProgressPage() {
  const [history, setHistory] = useState<QuizAttempt[]>([]);


useEffect(() => {
  const savedHistory = getQuizHistory();

  const completedHistory = savedHistory.filter(
    (attempt) => attempt.status === "completed"
  );

  const sortedHistory = [...completedHistory].sort(
    (a, b) =>
      new Date(b.completedAt ?? b.startedAt).getTime() -
      new Date(a.completedAt ?? a.startedAt).getTime()
  );

  setHistory(sortedHistory);
}, []);



const chartData = [...history].reverse().map((attempt, index) => {
  const { percentage } = calculateQuizScore(attempt);

  return {
    attempt: `Attempt ${index + 1}`,
    percentage,
  };
});
const averageScore =
  chartData.length > 0
    ? Math.round(
        chartData.reduce((sum, item) => sum + item.percentage, 0) /
          chartData.length,
      )
    : null;
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-12 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Your learning journey
          </p>
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              ← Back to Home
            </Link>
          </div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            My Progress
          </h1>
          <p className="mt-3 text-slate-500">
            Track your results and see how your knowledge grows.
          </p>
        </header>

        <section className="mb-8 grid gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Completed quizzes</p>
            <p className="mt-3 text-3xl font-bold">{history.length}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Average score</p>
            <p className="mt-3 text-3xl font-bold">
           {averageScore !== null ? `${averageScore}%` : "—"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Latest score</p>
            <p className="mt-3 text-3xl font-bold">
              {chartData.length > 0
                ? `${chartData[chartData.length - 1].percentage}%`
                : "—"}
            </p>
          </div>
        </section>

        {history.length === 0 ? (
          <section className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <h2 className="text-xl font-semibold text-slate-900">
              No quiz attempts yet
            </h2>

            <p className="mt-2 text-slate-500">
              Start your first quiz to track your learning progress.
            </p>

            <a
              href="/quiz/ai-fundamentals"
              className="mt-6 inline-block rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700"
            >
              Start your first quiz
            </a>
          </section>
        ) : (
          <>
            <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">Progress over time</h2>
              <p className="mt-1 text-sm text-slate-500">
                Your percentage score for each attempt.
              </p>

              <div className="mt-6 h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ top: 10, right: 12, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="attempt"
                      tick={{ fill: "#64748b", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[0, 100]}
                      unit="%"
                      tick={{ fill: "#64748b", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip formatter={(value) => [`${value}%`, "Score"]} />
                    <Line
                      type="monotone"
                      dataKey="percentage"
                      stroke="#2563eb"
                      strokeWidth={3}
                      dot={{ r: 5, fill: "#2563eb" }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-bold">Quiz history</h2>

              <div className="space-y-4">
                {history.map((attempt, index) => {
                 

                const { correctCount, totalAnswered, percentage } =
    calculateQuizScore(attempt);
                  const quizTitle =
                    quizzes.find((quiz) => quiz.id === attempt.quizId)?.title ??
                    "Unknown Quiz";
                  return (
                    <article
                      key={attempt.id}
                      className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                          Attempt {history.length - index}
                        </p>
                        <h3 className="mt-1 text-lg font-semibold">
                          {quizTitle}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          {attempt.completedAt
                            ? new Date(attempt.completedAt).toLocaleString()
                            : "Not completed"}
                        </p>
                      </div>

                      <div className="flex items-center gap-5">
                        <div>
                          <p className="text-sm text-slate-500">Score</p>
                          <p className="font-semibold">
                            {correctCount} / {attempt.answers.length}
                          </p>
                        </div>

                        <div className="min-w-20 rounded-xl bg-blue-50 px-4 py-3 text-center">
                          <p className="text-xl font-bold text-blue-700">
                            {percentage}%
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
