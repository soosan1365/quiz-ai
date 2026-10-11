"use client";

import { signIn, signOut } from "next-auth/react";

type AuthButtonProps = {
  isLoggedIn: boolean;
  userName?: string | null;
};

export default function AuthButton({ isLoggedIn, userName }: AuthButtonProps) {
  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-3">
        <span className="hidden text-sm font-medium text-gray-700 dark:text-gray-200 sm:inline">
          {userName || "My Account"}
        </span>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => signIn("google", {}, { prompt: "select_account" })}
      className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-violet-700"
    >
      Sign in with Google
    </button>
  );
}
