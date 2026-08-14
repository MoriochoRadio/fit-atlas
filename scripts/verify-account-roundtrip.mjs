import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { users } from "../drizzle/schema.ts";
import { createWorkoutLog, getDb, getFitnessProfile, listWorkoutLogs, saveFitnessProfile } from "../server/db.ts";

const db = await getDb();
if (!db) throw new Error("Database is unavailable");

const openId = `fit-atlas-verification-${randomUUID()}`;
let userId;

try {
  await db.insert(users).values({ openId, name: "Fit Atlas Verification", role: "user", lastSignedIn: new Date() });
  const [user] = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  if (!user) throw new Error("Temporary verification user was not created");
  userId = user.id;

  await saveFitnessProfile(userId, {
    age: 30,
    weightKg: 68,
    sex: "undisclosed",
    primaryGoal: "strength",
    experience: "beginner",
    recoveryContext: "reduced_readiness",
  });

  const profile = await getFitnessProfile(userId);
  if (profile?.recoveryContext !== "reduced_readiness") throw new Error("Profile recovery context did not round-trip");

  await createWorkoutLog(userId, {
    exerciseName: "Integration Verification Exercise",
    sets: 2,
    reps: 8,
    loadKg: 10,
    durationMinutes: 10,
    intensityRpe: 4,
    performedAt: Date.now(),
  });

  const logs = await listWorkoutLogs(userId);
  if (!logs.some((log) => log.exerciseName === "Integration Verification Exercise")) throw new Error("Workout log did not round-trip");

  console.log("Account profile and workout storage round-trip verified.");
} finally {
  if (userId) await db.delete(users).where(eq(users.id, userId));
}
