import { calculateQuizScore } from "@/lib/progress";
import { quizzes } from "@/data/quizzes";
import type { QuizAttempt } from "@/types/quiz";

type QuizHistoryProps = {
history: QuizAttempt[];
};
/**
 * Displays the user's completed quiz attempts and scores.
 */
export default function QuizHistory({ history }: QuizHistoryProps) {
return ( <section> <h2 className="mb-4 text-xl font-bold">Quiz history</h2>
  <div className="space-y-4">
    {history.map((attempt, index) => {
      const { correctCount, percentage } = calculateQuizScore(attempt);

      const quizTitle =
        quizzes.find((quiz) => quiz.id === attempt.quizId)?.title ??
        "Unknown Quiz";

      return (
        <article
          key={attempt.id}
          className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Attempt {history.length - index}
            </p>

            <h3 className="mt-1 text-lg font-semibold">{quizTitle}</h3>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {attempt.completedAt
                ? new Date(attempt.completedAt).toLocaleString()
                : "Not completed"}
            </p>
          </div>

          <div className="flex items-center gap-5">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Score
              </p>

              <p className="font-semibold">
                {correctCount} / {attempt.answers.length}
              </p>
            </div>

            <div className="min-w-20 rounded-xl bg-blue-50 px-4 py-3 text-center dark:bg-blue-950">
              <p className="text-xl font-bold text-blue-700 dark:text-blue-300">
                {percentage}%
              </p>
            </div>
          </div>
        </article>
      );
    })}
  </div>
</section>
);
}
