import { decimal, index, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const fitnessProfiles = mysqlTable("fitnessProfiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique().references(() => users.id, { onDelete: "cascade" }),
  age: int("age"),
  sex: mysqlEnum("sex", ["female", "male", "nonbinary", "undisclosed"]).default("undisclosed").notNull(),
  weightKg: decimal("weightKg", { precision: 6, scale: 2 }),
  primaryGoal: mysqlEnum("primaryGoal", ["strength", "endurance", "weight_management", "general_health"]).default("general_health").notNull(),
  experience: mysqlEnum("experience", ["beginner", "intermediate", "advanced"]).default("beginner").notNull(),
  recoveryContext: mysqlEnum("recoveryContext", ["none", "reduced_readiness", "pregnancy_postpartum"]).default("none").notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const workoutLogs = mysqlTable("workoutLogs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  exerciseName: varchar("exerciseName", { length: 160 }).notNull(),
  sets: int("sets").notNull(),
  reps: int("reps").notNull(),
  loadKg: decimal("loadKg", { precision: 7, scale: 2 }).default("0").notNull(),
  durationMinutes: int("durationMinutes").notNull(),
  intensityRpe: int("intensityRpe").notNull(),
  performedAt: timestamp("performedAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => [index("workout_user_performed_idx").on(table.userId, table.performedAt)]);

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type FitnessProfile = typeof fitnessProfiles.$inferSelect;
export type WorkoutLog = typeof workoutLogs.$inferSelect;
