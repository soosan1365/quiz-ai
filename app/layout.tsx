import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeProvider from "@/components/providers/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";
import { Suspense } from "react";
import AuthStatus from "@/components/auth/AuthStatus";
import QueryProvider from "@/components/providers/QueryProvider";
import { SessionProvider } from "next-auth/react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuizAI",
  description: "Interactive AI learning platform",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <SessionProvider>
          <QueryProvider>
            <ThemeProvider>
              <Navbar>
                <Suspense
                  fallback={
                    <div className="h-9 w-28 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
                  }
                >
                  <AuthStatus />
                </Suspense>
              </Navbar>

              <main className="flex-1">{children}</main>
            </ThemeProvider>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
