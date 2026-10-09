import { quizzes } from "../data/quizzes";

export function getQuizById(id: string) {
  return quizzes.find((quiz) => quiz.id === id);
}