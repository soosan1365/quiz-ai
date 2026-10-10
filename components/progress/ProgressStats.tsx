type ProgressStatsProps = {
  completedQuizzes: number;
  averageScore: number | null;
  latestScore: number | null;
};
/**
 * Displays summary statistics for completed quizzes.
 */
export default function ProgressStats({
  completedQuizzes,
  averageScore,
  latestScore,
}: ProgressStatsProps) {
  const stats = [
    {
      label: "Completed quizzes",
      value: completedQuizzes.toString(),
    },
    {
      label: "Average score",
      value: averageScore !== null ? `${averageScore}%` : "—",
    },
    {
      label: "Latest score",
      value: latestScore !== null ? `${latestScore}%` : "—",
    },
  ];

  return (
    <section className="mb-8 grid gap-5 sm:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          {" "}
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {stat.label}{" "}
          </p>
          <p className="mt-3 text-3xl font-bold">{stat.value}</p>
        </div>
      ))}
    </section>
  );
}
// سه کارت را با یک آرایه و map نمایش می‌دهیم؛ در نتیجه کد تکراری کمتر می‌شود.

// مقادیر از طریق props دریافت می‌شوند؛ بنابراین این کامپوننت به localStorage یا منطق صفحه وابسته نیست.

// اگر هنوز آزمونی انجام نشده باشد، امتیازها به‌جای عدد اشتباه با — نمایش داده می‌شوند.
