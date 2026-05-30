// ZOD validation schema

import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(2).describe("Title is required"),
  projectId: z.uuid().describe("Invalid project ID"),
});

export const updateTaskSchema = z.object({
  title: z.string().min(2).describe("Title is required"),
  isCompleted: z
    .boolean()
    .default(false)
    .describe("If the task item is completed ?"),
});

export const createProjectSchema = z.object({
  name: z.string().min(2).describe("Name is required"),
  description: z
    .string()
    .nullable()
    .optional()
    .describe("Description of the task category"),
});

export const idSchema = z.uuid().describe("Id is required");

export const updateProjectSchema = z.object({
  name: z.string().min(2).describe("Name cannot be empty"),
  description: z.string().optional(),
});
