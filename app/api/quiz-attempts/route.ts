
import { auth } from "@/auth";
import { getQuizById } from "@/lib/quiz";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return Response.json(
        { message: "Unauthorized" },
        { status: 401 },
      );
    }

    const attempts = await prisma.quizAttempt.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        completedAt: "desc",
      },
      select: {
        id: true,
        quizId: true,
        startedAt: true,
        completedAt: true,
        score: true,
        totalQuestions: true,
        status: true,
      },
    });

    return Response.json({ attempts });
  } catch (error) {
    console.error("Failed to fetch quiz attempts:", error);

    return Response.json(
      { message: "Failed to fetch quiz history" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const {
      quizId,
      answers,
      startedAt,
      questionOrder,
    } = body;

    if (
      typeof quizId !== "string" ||
      !Array.isArray(answers) ||
      !Array.isArray(questionOrder)
    ) {
      return NextResponse.json(
        { message: "Invalid request data" },
        { status: 400 }
      );
    }

    const quiz = getQuizById(quizId);

    if (!quiz) {
      return NextResponse.json(
        { message: "Quiz not found" },
        { status: 404 }
      );
    }

    const validQuestionIds = new Set(
      quiz.questions.map((question) => question.id)
    );

    const seenQuestionIds = new Set<string>();

    for (const answer of answers) {
      if (
        !answer ||
        typeof answer.questionId !== "string" ||
        !Number.isInteger(answer.selectedAnswer) ||
        !validQuestionIds.has(answer.questionId) ||
        seenQuestionIds.has(answer.questionId)
      ) {
        return NextResponse.json(
          { message: "Invalid answers" },
          { status: 400 }
        );
      }

      const question = quiz.questions.find(
        (item) => item.id === answer.questionId
      );

      if (
        !question ||
        answer.selectedAnswer < 0 ||
        answer.selectedAnswer >= question.options.length
      ) {
        return NextResponse.json(
          { message: "Invalid selected answer" },
          { status: 400 }
        );
      }

      seenQuestionIds.add(answer.questionId);
    }

    const score = answers.filter((answer) => {
      const question = quiz.questions.find(
        (item) => item.id === answer.questionId
      );

      return question?.correctAnswer === answer.selectedAnswer;
    }).length;

    const attempt = await prisma.quizAttempt.create({
      data: {
        userId: session.user.id,
        quizId,
        startedAt:
          typeof startedAt === "string" &&
          !Number.isNaN(Date.parse(startedAt))
            ? new Date(startedAt)
            : new Date(),
        completedAt: new Date(),
        answers,
        questionOrder,
        currentQuestionIndex: answers.length,
        status: "completed",
        score,
        totalQuestions: quiz.questions.length,
      },
    });

    return NextResponse.json(
      { attempt },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to save quiz attempt:", error);

    return NextResponse.json(
      { message: "Failed to save quiz attempt" },
      { status: 500 }
    );
  }
}