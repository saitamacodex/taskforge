import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { tasks } from "@/lib/db/schema";
import ApiError from "@/lib/apiError";
import { withErrorHandler } from "@/lib/api-handler";
import { createTaskSchema } from "@/lib/validation";
import { eq, asc, desc } from "drizzle-orm";

// get all the tasks
export const GET = withErrorHandler(async (req) => {
  // destructure queryParams from URL
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");

  const query = db
    .select({
      id: tasks.id,
      title: tasks.title,
      isCompleted: tasks.isCompleted,
      projectId: tasks.projectId,
      createdAt: tasks.createdAt,
    })
    .from(tasks);

  // CONDITIONAL Query
  const tasksList = projectId
    ? await query
        .where(eq(tasks.projectId, projectId))
        .orderBy(asc(tasks.isCompleted), desc(tasks.createdAt))
    : await query;

  // if no task found
  if (tasksList.length === 0) {
    throw ApiError.NOT_FOUND("No tasks found");
  }

  return NextResponse.json(
    {
      success: true,
      data: tasksList,
    },
    { status: 200 },
  );
});

export const POST = withErrorHandler(async (request) => {
  const body = await request.json();

  const bodyValidation = await createTaskSchema.safeParseAsync(body);

  if (bodyValidation.error) {
    throw ApiError.BAD_REQUEST(
      "Request body validation failed",
      bodyValidation.error?.issues[0].message,
    );
  }

  const { title, projectId } = bodyValidation.data;

  const [createdTask] = await db
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
