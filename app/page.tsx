import Link from "next/link";
import { quizzes } from "@/data/quizzes";
const categories = [
  {
    title: "AI Fundamentals",
    level: "Beginner",
    questions: 5,
    icon: "✦",
    quizId: "ai-fundamentals",
  },
  {
    title: "Machine Learning",
    level: "Intermediate",
    questions: 10,
    icon: "⌘",
    quizId: "machine-learning",
  },
  {
    title: "Prompt Engineering",
    level: "Beginner",
    questions: 6,
    icon: "✳",
    quizId: "prompt-engineering",
  },
  {
    title: "LLM Development",
    level: "Intermediate",
    questions: 12,
    icon: "◈",
    quizId: "llm-development",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-5">
        <h1 className="text-2xl font-bold text-violet-700">✦ QuizAI</h1>
        <div className="flex items-center gap-6 text-sm">
          <a href="#categories" className="hover:text-violet-700">
            Explore
          </a>
          <Link href="/progress">My Progress</Link>{" "}
          <Link
            href="/quiz/ai-fundamentals"
            className="rounded-xl bg-blue-600 px-6 py-3 text-white"
          >
            Start learning
          </Link>
        </div>
      </nav>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-8 py-20 md:grid-cols-2">
        <div>
          <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700">
            LEARN · PRACTICE · GROW
          </span>
          <h2 className="mt-7 text-5xl font-bold leading-tight">
            Level up your <span className="text-violet-600">AI skills.</span>
          </h2>
          <p className="mt-5 max-w-lg leading-7 text-slate-600">
            Short, focused quizzes to build your confidence in AI development.
          </p>
          <a
            href="#categories"
            className="mt-8 inline-block rounded-xl bg-violet-600 px-6 py-3 font-medium text-white hover:bg-violet-700"
          >
            Explore quizzes →
          </a>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-violet-100 to-indigo-100 p-10">
          <div className="rounded-2xl bg-white p-7 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                YOUR NEXT CHALLENGE
              </span>
              <span className="text-2xl">✦</span>
            </div>
            <h3 className="mt-6 text-2xl font-bold">Think smarter with AI</h3>
            <p className="mt-3 text-slate-600">
              Learn something new, one question at a time.
            </p>
            <div className="mt-6 h-2 rounded-full bg-slate-100">
              <div className="h-2 w-2/3 rounded-full bg-violet-600" />
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="mx-auto max-w-6xl px-8 py-10">
        <h2 className="text-3xl font-bold">Explore quiz categories</h2>
        <p className="mt-3 text-slate-600">
          Choose a topic and test what you know.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <article
              key={category.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-2xl text-violet-700">
                {category.icon}
              </div>
              <h3 className="mt-5 font-bold">{category.title}</h3>
              <p className="mt-2 text-sm text-slate-500">
                {category.questions} questions · {category.level}
              </p>
            {quizzes.some((quiz) => quiz.id === category.quizId) ? (
  <Link
    href={`/quiz/${category.quizId}`}
    className="mt-6 inline-block font-medium text-violet-700 transition hover:text-violet-900"
  >
    Start quiz →
  </Link>
) : (
  <span className="mt-6 inline-block text-sm text-slate-400">
    Coming soon
  </span>
)}
            </article>
          ))}
        </div>
      </section>

      <section id="progress" className="mx-auto max-w-6xl px-8 py-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-8">
          <h2 className="text-2xl font-bold">Your learning journey</h2>
          <p className="mt-3 text-slate-600">
            Your quiz history and progress will appear here.
          </p>
        </div>
      </section>
    </main>
  );
}
