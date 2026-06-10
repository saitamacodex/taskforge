// ZOD validation schema

import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(2).describe("Title is required"),
  projectId: z.uuid().describe("Invalid project ID"),
});

export const updateTaskSchema = z
  .object({
    title: z.string().min(2).describe("Title is required").optional(),
    isCompleted: z
      .boolean()
      .default(false)
      .describe("If the task item is completed ?"),
  })
  .refine(
    (data) => data.title !== undefined || data.isCompleted !== undefined,
    { message: "At least one field is required" },
  );

export const createProjectSchema = z.object({
  name: z.string().min(2).describe("Name is required"),
  description: z
    .string()
    .nullable()
    .optional()
    .describe("Description of the task category"),
});

export const idSchema = z.uuid().describe("Id is required");

export const updateProjectSchema = z
  .object({
    name: z.string().min(2).describe("Name cannot be empty").optional(),
    description: z.string().optional(),
  })
  .refine((data) => data.name !== undefined || data.description !== undefined, {
    message: "At least one field is required",
  });

export const signUpSchema = z.object({
  firstName: z.string().min(2).describe("Firstname is required"),
  lastName: z.string().nullable().optional(),
  email: z.email(),
  password: z.string().min(5).describe("Password must be mininum 6 character"),
});

export const signInSchema = z.object({
  email: z.email().describe("Email id is required"),
  password: z.string().min(5).describe("Password must be mininum 6 character"),
});

export type SignUpRequest = z.infer<typeof signUpSchema>;
export type SignInRequest = z.infer<typeof signInSchema>;
