
"use client";

import { useQuery } from "@tanstack/react-query";
import { getQuizHistory } from "@/services/quiz-history.service";

export function useQuizHistory() {
  return useQuery({
    queryKey: ["quiz-history"],
    queryFn: getQuizHistory,
  });
}
