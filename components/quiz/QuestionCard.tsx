
type QuestionCardProps = {
  questionText: string;
  options: string[];
  correctAnswer: number;
  selectedAnswer: number | null;
  onAnswer: (index: number) => void;
};
/**
 * Displays a quiz question and its answer options.
 */
export default function QuestionCard({
  questionText,
  options,
  correctAnswer,
  selectedAnswer,
  onAnswer,
}: QuestionCardProps) {
  return (
    <>
      <h1 className="flex min-h-40 items-center text-xl font-bold">
        {questionText}
      </h1>

      <div className="space-y-3">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = correctAnswer === index;

          let style = "border hover:bg-gray-100";

          if (selectedAnswer !== null && isCorrect) {
            style = "border border-green-500 bg-green-50 text-green-800";
          } else if (isSelected && !isCorrect) {
            style = "border border-red-500 bg-red-50 text-red-800";
          }

          return (
            <button
              key={option}
              onClick={() => onAnswer(index)}
              disabled={selectedAnswer !== null}
              className={`block w-full rounded-xl p-4 text-left ${style}`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </>
  );
}
// QuestionCard خودش وضعیت آزمون رو تغییر نمی‌ده؛ فقط اطلاعات رو از طریق props می‌گیره.

// onAnswer تابعی است که از QuizPlayer دریافت می‌کنه و هنگام کلیک، اندیس گزینه رو به والد برمی‌گردونه.

// منطق ذخیره‌ی پاسخ و جلوگیری از انتخاب دوباره، همچنان در QuizPlayer حفظ می‌شه.