import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { users } from "../drizzle/schema.ts";
import { getDb } from "../server/db.ts";
import { fitnessRouter } from "../server/routers/fitness.ts";

const db = await getDb();
if (!db) throw new Error("Database is unavailable");

const openId = `fit-atlas-protected-api-${randomUUID()}`;
let userId;

try {
  await db.insert(users).values({ openId, name: "Fit Atlas API Verification", role: "user", lastSignedIn: new Date() });
  const [user] = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  if (!user) throw new Error("Temporary authenticated user was not created");
  userId = user.id;

  const caller = fitnessRouter.createCaller({
    user,
    req: {},
    res: {},
  });

  await caller.saveProfile({
    age: 30,
    weightKg: 68,
    sex: "undisclosed",
    primaryGoal: "strength",
    experience: "beginner",
    recoveryContext: "reduced_readiness",
  });
  const profile = await caller.profile();
  if (profile?.recoveryContext !== "reduced_readiness") throw new Error("Protected profile route did not round-trip recovery context");

  await caller.workouts.create({
    exerciseName: "Protected API Verification Exercise",
    sets: 2,
    reps: 8,
    loadKg: 10,
    durationMinutes: 10,
    intensityRpe: 4,
    performedAt: Date.now(),
  });
  const logs = await caller.workouts.list();
  if (!logs.some((log) => log.exerciseName === "Protected API Verification Exercise")) throw new Error("Protected workout route did not round-trip");

  console.log("Protected profile and workout API round-trip verified.");
} finally {
  if (userId) await db.delete(users).where(eq(users.id, userId));
}
