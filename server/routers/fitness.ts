import { z } from "zod";
import * as db from "../db";
import { protectedProcedure, router } from "../_core/trpc";

const profileInput = z.object({
  age: z.number().int().min(13).max(120).nullable().optional(),
  sex: z.enum(["female", "male", "nonbinary", "undisclosed"]),
  weightKg: z.number().min(25).max(400).nullable().optional(),
  primaryGoal: z.enum(["strength", "endurance", "weight_management", "general_health"]),
  experience: z.enum(["beginner", "intermediate", "advanced"]),
});

const workoutInput = z.object({
  exerciseName: z.string().trim().min(1).max(160),
  sets: z.number().int().min(1).max(30),
  reps: z.number().int().min(1).max(500),
  loadKg: z.number().min(0).max(1000),
  durationMinutes: z.number().int().min(1).max(1440),
  intensityRpe: z.number().int().min(1).max(10),
  performedAt: z.number().int().positive(),
});

export const fitnessRouter = router({
  profile: protectedProcedure.query(({ ctx }) => db.getFitnessProfile(ctx.user.id)),
  saveProfile: protectedProcedure.input(profileInput).mutation(({ ctx, input }) => db.saveFitnessProfile(ctx.user.id, input)),
  workouts: router({
    list: protectedProcedure.query(({ ctx }) => db.listWorkoutLogs(ctx.user.id)),
    create: protectedProcedure.input(workoutInput).mutation(async ({ ctx, input }) => {
      await db.createWorkoutLog(ctx.user.id, input);
      return { success: true } as const;
    }),
  }),
});
