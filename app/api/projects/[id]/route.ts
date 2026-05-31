import { withErrorHandler } from "@/lib/api-handler";
import ApiError from "@/lib/apiError";
import { db } from "@/lib/db";
import { updateProjectSchema } from "@/lib/validation";
import { NextResponse } from "next/server";
import { projects } from "@/lib/db/schema";
import { eq } from "drizzle-orm/sql/expressions/conditions";

export const GET = withErrorHandler(async (req, ctx) => {
  if (!ctx) {
    throw ApiError.NOT_FOUND("Id not found");
  }

  const { id } = await ctx.params;
  const [response] = await db
    .select()
    .from(projects)
    .where(eq(projects.id, id));

  if (!response) {
    throw ApiError.NOT_FOUND("No Project found");
  }

  return NextResponse.json(
    {
      success: true,
      data: response,
    },
    { status: 200 },
  );
});

export const PUT = withErrorHandler(async (req, ctx) => {
  if (!ctx) {
    throw ApiError.NOT_FOUND("ID not found");
  }
  const { id } = await ctx.params;
  const body = await req.json();

  const reqBodyValidation = await updateProjectSchema.safeParseAsync(body);

  if (!reqBodyValidation.success) {
    throw ApiError.BAD_REQUEST(
      "Update body validation failed",
      reqBodyValidation.error?.issues,
    );
  }

  const projectData = reqBodyValidation.data;

  const [updatedProject] = await db
    .update(projects)
    .set(projectData)
    .where(eq(projects.id, id))
    .returning();

  if (!updatedProject) {
    throw ApiError.NOT_FOUND("Project not found");
  }

  return NextResponse.json(
    {
      success: true,
      data: updatedProject,
    },
    { status: 200 },
  );
});

// Delete Project with ID
export const DELETE = withErrorHandler(async (req, ctx) => {
  if (!ctx) {
    throw ApiError.NOT_FOUND("ID not found");
  }

  const { id } = await ctx.params;

  const [deletedProject] = await db
    .delete(projects)
    .where(eq(projects.id, id))
    .returning();

  if (!deletedProject) {
    throw ApiError.NOT_FOUND("Project not found");
  }

  return NextResponse.json(
    {
      success: true,
      message: `Project ${id} deleted`,
    },
    { status: 200 },
  );
});
