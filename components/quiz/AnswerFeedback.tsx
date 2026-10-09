
type AnswerFeedbackProps = {
  isCorrect: boolean;
  explanation: string;
};
/**
 * Provides feedback and explanations for the selected answer.
 */
export default function AnswerFeedback({
  isCorrect,
  explanation,
}: AnswerFeedbackProps) {
  return (
    <p className="mt-4 rounded-lg bg-gray-100 p-4 text-gray-900 dark:bg-slate-800 dark:text-gray-100">
      {isCorrect ? "Correct!" : "Incorrect!"} {explanation}
    </p>
  );
}
