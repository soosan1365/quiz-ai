
"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { saveQuizAttempt } from "@/services/quiz-attempt.service";

export function useSaveQuizAttempt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveQuizAttempt,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["quiz-history"],
      });
    },
  });
}
