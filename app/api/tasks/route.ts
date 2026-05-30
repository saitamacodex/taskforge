import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { tasks } from "@/lib/db/schema";
import ApiError from "@/lib/apiError";
import { withErrorHandler } from "@/lib/api-handler";
import { createTaskSchema } from "@/lib/validation";

// get all the tasks
export const GET = withErrorHandler(async () => {
  const allTasks = await db
    .select({
      id: tasks.id,
      title: tasks.title,
      isCompleted: tasks.isCompleted,
      projectId: tasks.projectId,
      createdAt: tasks.createdAt,
    })
    .from(tasks);

  // if not task found
  if (allTasks.length === 0) {
    throw ApiError.NOT_FOUND("No tasks found");
  }

  return NextResponse.json(
    {
      success: true,
      data: allTasks,
    },
    { status: 200 },
  );
});

export const POST = withErrorHandler(async (request) => {
  const body = await request.json();

  const bodyValidation = await createTaskSchema.safeParseAsync(body);

  console.log(bodyValidation);

  if (bodyValidation.error) {
    throw ApiError.BAD_REQUEST(
      "Request body validation failed",
      bodyValidation.error?.issues[0].message,
    );
  }

  const { title, projectId } = bodyValidation.data;

  const createdTask = await db
    .insert(tasks)
    .values({ title, projectId })
    .returning({
      id: tasks.id,
      title: tasks.title,
      isCompleted: tasks.isCompleted,
      projectId: tasks.projectId,
    });

  return NextResponse.json(
    {
      success: true,
      data: createdTask,
    },
    { status: 201 },
  );
});
