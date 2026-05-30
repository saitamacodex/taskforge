import { withErrorHandler } from "@/lib/api-handler";
import ApiError from "@/lib/apiError";
import { db } from "@/lib/db";
import { createProjectSchema } from "@/lib/validation";
import { NextResponse } from "next/server";
import { projects } from "@/lib/db/schema";

export const GET = withErrorHandler(async () => {
  const allProjects = await db.select().from(projects);

  if (allProjects.length === 0) {
    throw ApiError.NOT_FOUND("No Projects found, please start creating");
  }

  return NextResponse.json(
    {
      success: true,
      data: allProjects,
    },
    { status: 200 },
  );
});

export const POST = withErrorHandler(async (request) => {
  const body = await request.json();

  const reqBodyValidation = await createProjectSchema.safeParseAsync(body);

  if (!reqBodyValidation.success) {
    throw ApiError.BAD_REQUEST(
      "Request body validation failed",
      reqBodyValidation.error?.issues,
    );
  }

  const { name, description } = reqBodyValidation.data;
  const [createdProject] = await db
    .insert(projects)
    .values({ name, description })
    .returning();

  return NextResponse.json(
    {
      success: true,
      data: createdProject,
    },
    { status: 201 },
  );
});
