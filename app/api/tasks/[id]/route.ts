import { withErrorHandler } from "@/lib/api-handler";
import ApiError from "@/lib/apiError";
import { db } from "@/lib/db";
import { tasks } from "@/lib/db/schema";
import { idSchema, updateTaskSchema } from "@/lib/validation";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// Update Task with ID
export const PUT = withErrorHandler(async (req, ctx) => {
  if (!ctx) {
    throw ApiError.NOT_FOUND("ID not found");
  }
  const { id } = await ctx.params;
  const body = await req.json();

  const bodyValidation = await updateTaskSchema.safeParseAsync(body);
  if (!bodyValidation.success) {
    throw ApiError.BAD_REQUEST(
      "Update Validation Failed",
      bodyValidation.error?.issues,
    );
  }

  const taskData = bodyValidation.data;

  const [updatedTask] = await db
    .update(tasks)
    .set(taskData)
    .where(eq(tasks.id, id))
    .returning();

  if (!updatedTask) {
    throw ApiError.NOT_FOUND("Task not found");
  }

  return NextResponse.json(
    {
      success: true,
      message: `Task ${id} updated`,
    },
    { status: 200 },
  );
});

// Delete Task with ID
export const DELETE = withErrorHandler(async (req, ctx) => {
  if (!ctx) {
    throw ApiError.NOT_FOUND("ID not found");
  }

  const { id } = await ctx.params;
  const idValidation = await idSchema.safeParseAsync(id);

  if (idValidation.error) {
    throw ApiError.BAD_REQUEST(
      "Id validation failed",
      idValidation.error.issues,
    );
  }

  const [deletedTask] = await db
    .delete(tasks)
    .where(eq(tasks.id, id))
    .returning();

  if (!deletedTask) {
    throw ApiError.NOT_FOUND(`Task with ${id} not found`);
  }

  return NextResponse.json(
    { success: true, message: `Task ${id} deleted` },
    { status: 200 },
  );
});
