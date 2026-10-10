import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-6 py-16 text-slate-900">
      {/* Decorative background */}
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />

      <section className="relative w-full max-w-xl text-center">
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 text-xl font-bold tracking-tight"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
            Q
          </span>
          <span>
            Quiz<span className="text-blue-600">AI</span>
          </span>
        </Link>

        <div className="relative mx-auto mb-8 flex h-48 w-64 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-blue-100/70 blur-2xl" />

          <span className="relative select-none text-[120px] font-black leading-none tracking-tighter text-blue-600 sm:text-[144px]">
            404
          </span>

          <span className="absolute right-5 top-5 flex h-12 w-12 rotate-12 items-center justify-center rounded-2xl border border-blue-100 bg-white text-2xl shadow-lg">
            ?
          </span>
        </div>

        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
          Page not found
        </p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Oops! You took a wrong turn.
        </h1>

        <p className="mx-auto mt-5 max-w-md leading-7 text-slate-500">
          Looks like this page has gone missing. Don&apos;t worry, your learning
          journey is still waiting for you.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
          >
            <span aria-hidden="true">←</span>
            Back to Home
          </Link>

          <Link
            href="/progress"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50"
          >
            My Progress
          </Link>
        </div>

        <p className="mt-12 text-sm text-slate-400">
          Keep learning. Keep growing.
        </p>
      </section>
    </main>
  );
}
