export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-violet-100 via-white to-cyan-100 transition-colors duration-300 dark:from-slate-950 dark:via-violet-950 dark:to-slate-900">
      {/* Colorful background decorations */}
      <div className="pointer-events-none absolute -left-24 -top-24 -z-10 h-72 w-72 rounded-full bg-fuchsia-300/40 blur-3xl dark:bg-fuchsia-600/20" />
      <div className="pointer-events-none absolute -bottom-32 right-0 -z-10 h-80 w-80 rounded-full bg-cyan-300/40 blur-3xl dark:bg-cyan-500/20" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 sm:px-8 md:grid-cols-2 md:py-28">
        {/* Hero content */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm dark:border-violet-400/30 dark:bg-slate-900/70 dark:text-violet-300">
            <span className="h-2 w-2 rounded-full bg-fuchsia-500" />
            LEARN · PRACTICE · GROW
          </span>

          <h1 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
            Your AI journey
            <span className="mt-2 block bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
              starts here.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
            Build your AI knowledge, sharpen your skills, and grow your
            confidence with fun, focused quizzes.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#categories"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:-translate-y-0.5 hover:from-violet-700 hover:to-fuchsia-700"
            >
              Explore quizzes <span className="ml-2">→</span>
            </a>

            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Learn at your own pace
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600 dark:text-slate-300">
            <span>✦ Bite-sized learning</span>
            <span>✦ Track your progress</span>
          </div>
        </div>

        {/* AI preview panel */}
        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 opacity-40 blur-xl" />

          <div className="relative rounded-[2rem] border border-white/70 bg-white/80 p-5 shadow-2xl shadow-violet-900/10 backdrop-blur-xl sm:p-7 dark:border-white/10 dark:bg-slate-900/80">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold tracking-[0.2em] text-violet-600 dark:text-violet-300">
                  YOUR NEXT CHALLENGE
                </p>
                <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
                  Think smarter with AI
                </h2>
              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-2xl text-white shadow-lg shadow-violet-500/30">
                ✦
              </div>
            </div>

            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
              Every question is a new opportunity to learn something useful.
            </p>

            <div className="mt-7 rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-cyan-50 p-4 dark:border-white/10 dark:from-slate-800 dark:to-violet-950">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-xl text-white">
                  ✧
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    AI Fundamentals
                  </p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    One question at a time
                  </p>
                </div>
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500" />
              </div>

              <div className="mt-2 flex justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Your learning journey</span>
                <span>Keep growing ✨</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
