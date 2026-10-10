/**
 * Highlights the three steps of the QuizAI learning journey.
 */
export default function LearningHighlights() {
  return (
    <section id="progress" className="mx-auto max-w-6xl px-6 py-14 sm:px-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 transition-colors duration-300 sm:p-10 dark:border-slate-700 dark:!bg-slate-900">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
            Your learning journey
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Learn. Practice. Grow.
          </h2>

          <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
            Build your AI knowledge one quiz at a time. Track what you learn and
            keep improving with every step.
          </p>
        </div>

        <div className="mt-8 grid gap-6 border-t border-slate-200 pt-6 sm:grid-cols-3 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 font-bold text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
              01
            </span>
            <span className="font-medium text-slate-800 dark:text-slate-200">
              Learn new concepts
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 font-bold text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300">
              02
            </span>
            <span className="font-medium text-slate-800 dark:text-slate-200">
              Test your knowledge
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 font-bold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
              03
            </span>
            <span className="font-medium text-slate-800 dark:text-slate-200">
              Improve your skills
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
