"use client";

import { signIn } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quizUrl: string;
};

export default function SignInModal({ open, onOpenChange, quizUrl }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm border-slate-200 bg-white text-slate-900">
        <DialogHeader className="items-center text-center">
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400">
            <span className="text-2xl">✦</span>
          </div>

          <DialogTitle className="text-xl font-bold">
            Sign in to QuizAI
          </DialogTitle>

          <DialogDescription className="pt-1 leading-6">
            Sign in with Google to start your quiz and save your progress.
          </DialogDescription>
        </DialogHeader>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: quizUrl })}
          className="mt-4 flex w-full items-center justify-center gap-3 rounded-xl bg-violet-600 px-4 py-3 font-medium text-white transition hover:bg-violet-700"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white font-bold text-blue-600">
            G
          </span>
          Continue with Google
        </button>
      </DialogContent>
    </Dialog>
  );
}
