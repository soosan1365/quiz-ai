"use client";

import { useEffect, useRef, useState } from "react";
import type { Quiz, AnswerRecord } from "@/types/quiz";
import { shuffleQuestions } from "@/lib/quiz-utils";
import Link from "next/link";
import {
  saveQuizAttempt,
  saveInProgressAttempt,
  getInProgressAttempt,
  clearInProgressAttempt,
} from "@/lib/progress";

type Props = {
  quiz: Quiz;
};

export default function QuizPlayer({ quiz }: Props) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isRestoring, setIsRestoring] = useState(true);
  const [questionOrder, setQuestionOrder] = useState<string[]>([]);
  const attemptIdRef = useRef("");
  const startedAtRef = useRef("");
  const answeredRef = useRef(false);

  useEffect(() => {
    const savedAttempt = getInProgressAttempt(quiz.id);
    if (savedAttempt?.status === "in-progress") {
      const savedOrder = savedAttempt.questionOrder;

      setQuestionOrder(
        Array.isArray(savedOrder) && savedOrder.length === quiz.questions.length
          ? savedOrder
          : quiz.questions.map((question) => question.id),
      );

      const safeIndex = Math.min(
        Math.max(savedAttempt.currentQuestionIndex, 0),
        quiz.questions.length - 1,
      );

      attemptIdRef.current = savedAttempt.id;
      startedAtRef.current = savedAttempt.startedAt;

      setCurrentQuestionIndex(safeIndex);
      setAnswers(savedAttempt.answers);

      const currentQuestionId = savedAttempt.questionOrder?.[safeIndex];

      const currentAnswer = savedAttempt.answers.find(
        (answer) => answer.questionId === currentQuestionId,
      );

      setSelectedAnswer(currentAnswer?.selectedAnswer ?? null);
      answeredRef.current = currentAnswer !== undefined;
    } else {
      setQuestionOrder(
        shuffleQuestions(quiz.questions.map((question) => question.id)),
      );
      attemptIdRef.current = crypto.randomUUID();
      startedAtRef.current = new Date().toISOString();
    }

    setIsRestoring(false);
  }, [quiz]);

  useEffect(() => {
    if (isRestoring || isFinished || questionOrder.length === 0) return;
    saveInProgressAttempt({
      id: attemptIdRef.current,
      quizId: quiz.id,
      startedAt: startedAtRef.current,
      currentQuestionIndex,
      answers,
      status: "in-progress",
      questionOrder,
    });
  }, [
    quiz.id,
    currentQuestionIndex,
    answers,
    isRestoring,
    isFinished,
    questionOrder,
  ]);

  if (isRestoring) {
    return (
      <main className="mx-auto max-w-3xl p-8">
        <p className="text-slate-500">Restoring your quiz...</p>
      </main>
    );
  }

  const questionId = questionOrder[currentQuestionIndex];

  const question = quiz.questions.find((item) => item.id === questionId)!;
  function handleAnswer(index: number) {
    if (answeredRef.current) return;

    answeredRef.current = true;

    setSelectedAnswer(index);

    setAnswers((previous) => [
      ...previous,
      {
        questionId: question.id,
        selectedAnswer: index,
        isCorrect: index === question.correctAnswer,
      },
    ]);
  }

  function handleNext() {
    if (selectedAnswer === null) return;

    if (currentQuestionIndex === quiz.questions.length - 1) {
      const completedAt = new Date().toISOString();

      saveQuizAttempt({
        id: attemptIdRef.current,
        quizId: quiz.id,
        startedAt: startedAtRef.current,
        completedAt,
        currentQuestionIndex,
        answers,
        status: "completed",
        questionOrder,
      });

      clearInProgressAttempt(quiz.id);
      setIsFinished(true);
      return;
    }

    setCurrentQuestionIndex((index) => index + 1);
    setSelectedAnswer(null);
    answeredRef.current = false;
  }

  function handleRetake() {
    clearInProgressAttempt(quiz.id);

    attemptIdRef.current = crypto.randomUUID();
    startedAtRef.current = new Date().toISOString();
    answeredRef.current = false;

    setCurrentQuestionIndex(0);
    setQuestionOrder(
      shuffleQuestions(quiz.questions.map((question) => question.id)),
    );
    setSelectedAnswer(null);
    setAnswers([]);
    setIsFinished(false);
  }
  if (isFinished) {
    const correctCount = answers.filter((answer) => answer.isCorrect).length;

    const percentage = Math.round((correctCount / quiz.questions.length) * 100);
    const performanceMessage =
      percentage >= 80
        ? "Excellent work! You have a strong understanding of this topic."
        : percentage >= 60
          ? "Good effort! A little more practice will help you improve."
          : "Keep practicing! Review the explanations and try again.";
    return (
      <main className="mx-auto max-w-3xl p-8 text-center">
        <h1 className="text-3xl font-bold">Quiz Completed!</h1>

        <p className="mt-4">
          Your score: {correctCount} / {quiz.questions.length}
        </p>

        <p className="mt-2">Percentage: {percentage}%</p>
        <p className="mt-3 text-slate-600">{performanceMessage}</p>
        <div className="mt-8 text-left">
          <h2 className="mb-4 text-xl font-bold">Review Your Answers</h2>

          {answers
            .filter((answer) => !answer.isCorrect)
            .map((answer) => {
              const missedQuestion = quiz.questions.find(
                (item) => item.id === answer.questionId,
              );

              if (!missedQuestion) return null;

              return (
                <div
                  key={answer.questionId}
                  className="mb-4 rounded-xl border border-red-200 p-4"
                >
                  <p className="font-semibold">{missedQuestion.text}</p>

                  <p className="mt-2 text-red-600">
                    Your answer: {missedQuestion.options[answer.selectedAnswer]}
                  </p>

                  <p className="mt-1 text-green-700">
                    Correct answer:{" "}
                    {missedQuestion.options[missedQuestion.correctAnswer]}
                  </p>

                  <p className="mt-2 text-gray-600">
                    {missedQuestion.explanation}
                  </p>
                </div>
              );
            })}

          {answers.every((answer) => answer.isCorrect) && (
            <p className="text-green-700">
              Perfect score! You answered every question correctly.
            </p>
          )}
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button
            onClick={handleRetake}
            className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Retake Quiz
          </button>

          <Link
            href="/"
            className="rounded-xl border border-blue-600 bg-white px-6 py-3 font-medium text-blue-600 transition hover:bg-blue-50"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl p-8">
      <p className="mb-4 text-sm text-gray-500">
        Question {currentQuestionIndex + 1} of {quiz.questions.length}
      </p>

      <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-300"
          style={{
            width: `${
              ((currentQuestionIndex + 1) / quiz.questions.length) * 100
            }%`,
          }}
        />
      </div>

      <h1 className="mb-6 text-2xl font-bold">{question.text}</h1>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = question.correctAnswer === index;

          let style = "border hover:bg-gray-100";

          if (selectedAnswer !== null && isCorrect) {
            style = "border border-green-500 bg-green-50 text-green-800";
          } else if (isSelected && !isCorrect) {
            style = "border border-red-500 bg-red-50 text-red-800";
          }

          return (
            <button
              key={option}
              onClick={() => handleAnswer(index)}
              disabled={selectedAnswer !== null}
              className={`block w-full rounded-xl p-4 text-left ${style}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {selectedAnswer !== null && (
        <p className="mt-4 rounded-lg bg-gray-100 p-4">
          {selectedAnswer === question.correctAnswer
            ? "Correct!"
            : "Incorrect!"}{" "}
          {question.explanation}
        </p>
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
