"use client";

import { useEffect, useRef, useState } from "react";
import type { Quiz, AnswerRecord } from "@/types/quiz";
import { shuffleQuestions } from "@/lib/quiz-utils";
import {
  saveQuizAttempt,
  saveInProgressAttempt,
  getInProgressAttempt,
  clearInProgressAttempt,
  getLatestCompletedAttempt,
} from "@/lib/progress";

/**
 * Manages quiz state, answer selection, progress persistence,
 * session restoration, and quiz retakes.
 */

export function useQuizSession(quiz: Quiz) {
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
    const completedAttempt = getLatestCompletedAttempt(quiz.id);
    if (
      savedAttempt?.status === "in-progress" &&
      (!completedAttempt ||
        new Date(savedAttempt.startedAt).getTime() >
          new Date(
            completedAttempt.completedAt ?? completedAttempt.startedAt,
          ).getTime())
    ) {
      const savedOrder = savedAttempt.questionOrder;

      const questionIds = quiz.questions.map((question) => question.id);

      const validOrder =
        Array.isArray(savedOrder) &&
        savedOrder.length === questionIds.length &&
        new Set(savedOrder).size === questionIds.length &&
        questionIds.every((id) => savedOrder.includes(id));
      setQuestionOrder(
        validOrder ? savedOrder : quiz.questions.map((question) => question.id),
      );

      const safeIndex = Math.min(
        Math.max(savedAttempt.currentQuestionIndex, 0),
        quiz.questions.length - 1,
      );

      attemptIdRef.current = savedAttempt.id;
      startedAtRef.current = savedAttempt.startedAt;

      setCurrentQuestionIndex(safeIndex);
      setAnswers(savedAttempt.answers);

      const currentQuestionId = validOrder
        ? savedOrder[safeIndex]
        : quiz.questions[safeIndex]?.id;

      const currentAnswer = savedAttempt.answers.find(
        (answer) => answer.questionId === currentQuestionId,
      );

      setSelectedAnswer(currentAnswer?.selectedAnswer ?? null);
      answeredRef.current = currentAnswer !== undefined;
 } else if (completedAttempt) {
  const validAnswers = completedAttempt.answers.filter((answer) =>
    quiz.questions.some((question) => question.id === answer.questionId),
  );

  setQuestionOrder(
    completedAttempt.questionOrder?.length === quiz.questions.length
      ? completedAttempt.questionOrder
      : quiz.questions.map((question) => question.id),
  );

  attemptIdRef.current = completedAttempt.id;
  startedAtRef.current = completedAttempt.startedAt;

  setAnswers(validAnswers);
  setCurrentQuestionIndex(quiz.questions.length - 1);
  setSelectedAnswer(null);
  setIsFinished(true);
  answeredRef.current = false;
} else {
  setQuestionOrder(
    shuffleQuestions(quiz.questions.map((question) => question.id)),
  );
  attemptIdRef.current = crypto.randomUUID();
  startedAtRef.current = new Date().toISOString();
  answeredRef.current = false;
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

  function handleAnswer(index: number, questionId: string) {
    if (answeredRef.current) return;

    const question = quiz.questions.find((item) => item.id === questionId);

    if (!question || index < 0 || index >= question.options.length) {
      return;
    }

    answeredRef.current = true;
    answeredRef.current = true;
    setSelectedAnswer(index);

    setAnswers((previous) => {
      if (previous.some((answer) => answer.questionId === questionId)) {
        return previous;
      }

      return [
        ...previous,
        {
          questionId,
          selectedAnswer: index,
          isCorrect: index === question.correctAnswer,
        },
      ];
    });
  }

  function handleNext() {
    if (selectedAnswer === null) return;

    if (currentQuestionIndex === quiz.questions.length - 1) {
      saveQuizAttempt({
        id: attemptIdRef.current,
        quizId: quiz.id,
        startedAt: startedAtRef.current,
        completedAt: new Date().toISOString(),
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

  return {
    currentQuestionIndex,
    selectedAnswer,
    answers,
    isFinished,
    isRestoring,
    questionOrder,
    handleAnswer,
    handleNext,
    handleRetake,
  };
}
