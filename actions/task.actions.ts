"use server";

import { db } from "@/lib/db";
import { tasks } from "@/lib/db/schema";
import { createTaskSchema } from "@/lib/validation";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createTask(title: string, projectId: string) {
  try {
    const validated = await createTaskSchema.safeParseAsync({
      title,
      projectId,
    });

    if (!validated.success) {
      return {
        success: false,
        message: validated.error?.issues[0].message,
      };
    }

    const createdTask = await db
      .insert(tasks)
      .values(validated.data)
      .returning();

    revalidatePath(`/projects/${projectId}`);

    return {
      success: true,
      data: createdTask,
    };
  } catch (error) {
    return { success: false, errors: error };
  }
}

export async function deleteTask(id: string, projectId: string) {
  try {
    await db.delete(tasks).where(eq(tasks.id, id));

    revalidatePath(`/projects/${projectId}`);

    return { success: true };
  } catch (error) {
    return { success: false, errors: error };
  }
}
