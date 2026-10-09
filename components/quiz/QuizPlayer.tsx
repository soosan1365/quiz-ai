"use client";
import type { Quiz } from "@/types/quiz";
import QuizProgress from "@/components/quiz/QuizProgress";
import QuestionCard from "@/components/quiz/QuestionCard";
import AnswerFeedback from "@/components/quiz/AnswerFeedback";
import QuizResults from "@/components/quiz/QuizResults";
import { useQuizSession } from "@/hooks/useQuizSession";

type Props = {
  quiz: Quiz;
};
/**
 * Renders the quiz interface and coordinates the quiz session.
 */
export default function QuizPlayer({ quiz }: Props) {
  const {
    currentQuestionIndex,
    selectedAnswer,
    answers,
    isFinished,
    isRestoring,
    questionOrder,
    handleAnswer,
    handleNext,
    handleRetake,
  } = useQuizSession(quiz);
  if (isRestoring) {
    return (
      <main className="mx-auto max-w-3xl p-8">
        <p className="text-slate-500">Restoring your quiz...</p>
      </main>
    );
  }
  const questionId = questionOrder[currentQuestionIndex];
  const question = quiz.questions.find((item) => item.id === questionId);

  if (!question) {
    return (
      <main className="mx-auto max-w-3xl p-8">
        <p className="text-red-600">
          Unable to load this question. Please restart the quiz.
        </p>
        <button
          onClick={handleRetake}
          className="mt-4 rounded-xl bg-blue-600 px-6 py-3 text-white"
        >
          Restart Quiz
        </button>
      </main>
    );
  }
  if (isFinished) {
    return (
      <QuizResults quiz={quiz} answers={answers} onRetake={handleRetake} />
    );
  }
  return (
    <main className="mx-auto max-w-3xl p-8">
      <QuizProgress
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={quiz.questions.length}
      />

      <QuestionCard
        questionText={question.text}
        options={question.options}
        correctAnswer={question.correctAnswer}
        selectedAnswer={selectedAnswer}
        onAnswer={(index) => handleAnswer(index, question.id)}
      />
      {selectedAnswer !== null && (
        <AnswerFeedback
          isCorrect={selectedAnswer === question.correctAnswer}
          explanation={question.explanation}
        />
      )}

      <button
        onClick={handleNext}
        disabled={selectedAnswer === null}
        className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-white disabled:opacity-50"
      >
        {currentQuestionIndex === quiz.questions.length - 1
          ? "See Results"
          : "Next Question"}
      </button>
    </main>
  );
}
