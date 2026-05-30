import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { tasks } from "@/lib/db/schema";
import ApiError from "@/lib/apiError";

// get all the tasks
export async function GET() {
  try {
    const allTodo = await db
      .select({
        id: tasks.id,
        title: tasks.title,
        description: tasks.description,
        isCompleted: tasks.isCompleted,
        projectId: tasks.projectId,
        createdAt: tasks.createdAt,
      })
      .from(tasks);

    // validation
    if (allTodo.length === 0) {
      throw ApiError.NOT_FOUND("Items not Found");
    }

    return NextResponse.json(
      {
        success: true,
        data: allTodo,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error occured while feting all Todo:", error);
  }
}
