"use client";

import { useState } from "react";
import SignInModal from "@/components/auth/SignInModal";
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

type Props = {
  isLoggedIn: boolean;
};

export default function QuizCategories({ isLoggedIn }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuizUrl, setSelectedQuizUrl] = useState("/");
  return (
    <section
      id="categories"
      className="mx-auto max-w-6xl px-8 py-10 text-slate-900 dark:text-slate-100"
    >
      <h2 className="text-3xl font-bold">Explore quiz categories</h2>
      <p className="mt-3 text-slate-600">
        Choose a topic and test what you know.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <article
            key={category.title}
            className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/10 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-violet-500"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-2xl text-violet-700">
              {category.icon}
            </div>
            <h3 className="mt-5 font-bold">{category.title}</h3>
            <p className="mt-2 text-sm text-slate-500">
              {category.questions} questions · {category.level}
            </p>
            {quizzes.some((quiz) => quiz.id === category.quizId) ? (
              isLoggedIn ? (
                <Link
                  href={`/quiz/${category.quizId}`}
                  className="mt-6 inline-block font-medium text-violet-700 transition hover:text-violet-900"
                >
                  Start quiz →
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedQuizUrl(`/quiz/${category.quizId}`);
                    setIsModalOpen(true);
                  }}
                  className="mt-6 inline-block font-medium text-violet-700 transition hover:text-violet-900"
                >
                  Start quiz →
                </button>
              )
            ) : (
              <span className="mt-6 inline-block text-sm text-slate-400">
                Coming soon
              </span>
            )}
          </article>
        ))}
      </div>
      <SignInModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        quizUrl={selectedQuizUrl}
      />
    </section>
  );
}
