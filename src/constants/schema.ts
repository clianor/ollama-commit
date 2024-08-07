import { z } from "zod";

export const commitSchema = z.object({
  type: z
    .enum([
      "feat",
      "fix",
      "docs",
      "style",
      "refactor",
      "perf",
      "test",
      "build",
      "ci",
      "chore",
      "revert",
    ])
    .describe("The type of the commit."),
  scope: z
    .string()
    .optional()
    .describe("The scope of the change (e.g., component or file name)."),
  subject: z.string().describe("A short description of the change."),
  body: z
    .string()
    .array()
    .optional()
    .describe("A detailed description of the change."),
});

export type CommitSchema = z.infer<typeof commitSchema>;
