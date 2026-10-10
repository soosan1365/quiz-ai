import { Suspense } from "react";
import { getQuizById } from "@/lib/quiz";
import { notFound } from "next/navigation";
import QuizPlayer from "@/components/quiz/QuizPlayer";
import { LoaderCircle } from "lucide-react";
type Props = {
  params: Promise<{ id: string }>;
};
// Loading UI to display while fetching quiz data from the API.
function QuizLoading() {
  return (
    <main
      className="mx-auto min-h-screen max-w-4xl px-4 py-10 sm:px-6 sm:py-16"
      role="status"
      aria-live="polite"
      aria-label="Loading quiz"
    >
      <div className="mb-8 flex flex-col items-center gap-3">
        <LoaderCircle
          size={32}
          className="animate-spin text-violet-600 dark:text-violet-400"
          aria-hidden="true"
        />

        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Preparing your quiz...
        </p>
      </div>
      <div className="animate-pulse space-y-8">
        {/* Quiz header skeleton */}
        <div className="space-y-3 text-center">
          <div className="mx-auto h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mx-auto h-8 w-3/4 max-w-md rounded-lg bg-gray-200 dark:bg-gray-700" />
          <div className="mx-auto h-4 w-48 rounded bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Progress skeleton */}
        <div className="rounded-2xl border border-gray-200 p-5 dark:border-gray-700 sm:p-7">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="h-4 w-28 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700" />
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div className="h-full w-1/3 rounded-full bg-violet-400" />
          </div>

          {/* Question skeleton */}
          <div className="mt-8 space-y-4">
            <div className="h-6 w-full max-w-lg rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-6 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Answer options skeleton */}
          <div className="mt-8 space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-14 rounded-xl border border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800"
              />
            ))}
          </div>

          {/* Action button skeleton */}
          <div className="mt-8 flex justify-end">
            <div className="h-11 w-32 rounded-xl bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default function QuizPage({ params }: Props) {
  return (
    <Suspense fallback={<QuizLoading />}>
      <QuizContent params={params} />
    </Suspense>
  );
}

async function QuizContent({ params }: Props) {
  const { id } = await params;
  const quiz = getQuizById(id);

  if (!quiz) {
    notFound();
  }

  return <QuizPlayer quiz={quiz} />;
}
