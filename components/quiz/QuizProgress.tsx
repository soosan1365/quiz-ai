type QuizProgressProps = {
  currentQuestion: number;
  totalQuestions: number;
};
/**
 * Displays the user's current position and progress within a quiz.
 */
export default function QuizProgress({
  currentQuestion,
  totalQuestions,
}: QuizProgressProps) {
  const progress = (currentQuestion / totalQuestions) * 100;
  return (
    <>
      <p className="mb-4 text-sm text-gray-500">
        Question {currentQuestion} of {totalQuestions}
      </p>

      <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </>
  );
}
