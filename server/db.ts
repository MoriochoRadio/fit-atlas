import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { fitnessProfiles, InsertUser, users, workoutLogs } from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;

  const values: InsertUser = { openId: user.openId, lastSignedIn: new Date() };
  const updateSet: Record<string, unknown> = { lastSignedIn: new Date() };
  for (const field of ["name", "email", "loginMethod"] as const) {
    if (user[field] !== undefined) {
      values[field] = user[field] ?? null;
      updateSet[field] = user[field] ?? null;
    }
  }
  if (user.role !== undefined) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = "admin";
    updateSet.role = "admin";
  }
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function getFitnessProfile(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(fitnessProfiles).where(eq(fitnessProfiles.userId, userId)).limit(1);
  return result[0];
}

export async function saveFitnessProfile(userId: number, profile: {
  age?: number | null; sex: "female" | "male" | "nonbinary" | "undisclosed"; weightKg?: number | null;
  primaryGoal: "strength" | "endurance" | "weight_management" | "general_health"; experience: "beginner" | "intermediate" | "advanced";
  recoveryContext: "none" | "reduced_readiness" | "pregnancy_postpartum";
}) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.insert(fitnessProfiles).values({
    userId, age: profile.age ?? null, sex: profile.sex, weightKg: profile.weightKg?.toFixed(2) ?? null,
    primaryGoal: profile.primaryGoal, experience: profile.experience, recoveryContext: profile.recoveryContext,
  }).onDuplicateKeyUpdate({ set: {
    age: profile.age ?? null, sex: profile.sex, weightKg: profile.weightKg?.toFixed(2) ?? null,
    primaryGoal: profile.primaryGoal, experience: profile.experience, recoveryContext: profile.recoveryContext,
  } });
  return getFitnessProfile(userId);
}

export async function listWorkoutLogs(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(workoutLogs).where(eq(workoutLogs.userId, userId)).orderBy(desc(workoutLogs.performedAt));
}

export async function createWorkoutLog(userId: number, input: {
  exerciseName: string; sets: number; reps: number; loadKg: number; durationMinutes: number; intensityRpe: number; performedAt: number;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.insert(workoutLogs).values({
    userId, exerciseName: input.exerciseName, sets: input.sets, reps: input.reps, loadKg: input.loadKg.toFixed(2),
    durationMinutes: input.durationMinutes, intensityRpe: input.intensityRpe, performedAt: new Date(input.performedAt),
  });
}
