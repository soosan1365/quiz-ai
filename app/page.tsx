
import HeroSection from "@/components/home/HeroSection";
import QuizCategories from "@/components/home/QuizCategories";
import LearningHighlights from "@/components/home/LearningHighlights";

/**
 * Renders the QuizAI landing page and introduces available quizzes.
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:!bg-slate-950 dark:text-slate-100">
      <HeroSection />
      <QuizCategories />
      <LearningHighlights />
    </main>
  );
}
