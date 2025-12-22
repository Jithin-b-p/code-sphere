import {z} from "zod";

export const CreateProblemSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
    timeLimitMs: z.number().int().positive().optional(),
    memoryMb: z.number().int().positive().optional(),
    testCases: z.array(z.object({
        input: z.string(),
        output: z.string()
    })).optional(),
});

export type CreateProblemType = z.infer<typeof CreateProblemSchema>;