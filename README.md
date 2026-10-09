# QuizAI — Interactive AI Learning Platform

QuizAI is a responsive quiz application designed to help users learn and test their knowledge of Artificial Intelligence through interactive quizzes, instant feedback, and progress tracking.

## Features

* Multiple AI learning categories and difficulty levels
* Multiple-choice questions with instant feedback and explanations
* Quiz progress indicator
* Results summary with score, percentage, and performance feedback
* Review of incorrect answers
* Retake quizzes with shuffled question order
* Automatic saving and restoration of in-progress quizzes
* Progress dashboard with score history and performance chart
* Persistent progress using localStorage
* Responsive user interface

## Tech Stack

* Next.js
* React
* TypeScript
* Tailwind CSS
* Recharts
* Browser localStorage

## Getting Started

### Prerequisites

* Node.js
* npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/soosan1365/quiz-ai.git
   ```

2. Navigate to the project directory:

   ```bash
   cd quiz-ai
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open http://localhost:3000 in your browser.

## Data Storage

Quiz questions are stored locally in the project, while quiz attempts and in-progress sessions are saved in the browser using localStorage. No backend or external API is required.

## Future Improvements

* Add more quiz categories and questions
* Add user authentication and cloud-based progress synchronization
* Expand analytics and learning statistics

## Author

Developed as a portfolio project to demonstrate frontend development skills.
