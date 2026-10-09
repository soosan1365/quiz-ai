
import { Suspense } from "react";
import { getQuizById } from "@/lib/quiz";
import { notFound } from "next/navigation";
import QuizPlayer from "@/components/QuizPlayer";

type Props = {
  params: Promise<{ id: string }>;
};

export default function QuizPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center">
          Loading quiz...
        </div>
      }
    >
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
