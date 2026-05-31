"use server";

import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { createProjectSchema } from "@/lib/validation";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// create project task
export async function createProject(name: string, description: string) {
  try {
    const validated = await createProjectSchema.safeParseAsync({
      name,
      description,
    });

    if (!validated.success) {
      return {
        success: false,
        message: validated.error?.issues[0].message,
      };
    }
    // store in db
    const proj = await db.insert(projects).values(validated.data).returning();
    // revalidate path to update the UI after creation
    revalidatePath("/dashboard");

    return { success: true, data: proj };
  } catch (error) {
    return {
      success: false,
      errors: error,
    };
  }
}

// delete project task
export async function deleteProject(id: string) {
  try {
    // delete from db
    await db.delete(projects).where(eq(projects.id, id));
    // revalidate path to update the UI after deletion
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return { success: false, errors: error };
  }
}
