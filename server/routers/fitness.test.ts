import { beforeEach, describe, expect, it, vi } from "vitest";
import { fitnessRouter } from "./fitness";
import type { TrpcContext } from "../_core/context";

const mocks = vi.hoisted(() => ({
  createWorkoutLog: vi.fn(),
  listWorkoutLogs: vi.fn(),
  saveFitnessProfile: vi.fn(),
  getFitnessProfile: vi.fn(),
}));

vi.mock("../db", () => mocks);

function createContext(): TrpcContext {
  return {
    user: {
      id: 42,
      openId: "fit-atlas-test-user",
      name: "Test User",
      email: "test@example.com",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {} as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("fitness.workouts.create", () => {
  beforeEach(() => vi.clearAllMocks());

  it("stores a workout under the authenticated user only", async () => {
    const caller = fitnessRouter.createCaller(createContext());
    mocks.createWorkoutLog.mockResolvedValue(undefined);

    const result = await caller.workouts.create({
      exerciseName: "바벨 백 스쿼트",
      sets: 3,
      reps: 8,
      loadKg: 40,
      durationMinutes: 35,
      intensityRpe: 6,
      performedAt: Date.now(),
    });

    expect(result).toEqual({ success: true });
    expect(mocks.createWorkoutLog).toHaveBeenCalledWith(42, expect.objectContaining({ exerciseName: "바벨 백 스쿼트", loadKg: 40 }));
  });

  it("rejects out-of-range intensity before persistence", async () => {
    const caller = fitnessRouter.createCaller(createContext());

    await expect(caller.workouts.create({
      exerciseName: "푸시업",
      sets: 3,
      reps: 10,
      loadKg: 0,
      durationMinutes: 20,
      intensityRpe: 11,
      performedAt: Date.now(),
    })).rejects.toThrow();

    expect(mocks.createWorkoutLog).not.toHaveBeenCalled();
  });
});

describe("fitness.saveProfile", () => {
  it("persists a bounded personalization profile for the signed-in user", async () => {
    const caller = fitnessRouter.createCaller(createContext());
    mocks.saveFitnessProfile.mockResolvedValue({ userId: 42, primaryGoal: "strength" });

    await caller.saveProfile({ age: 30, weightKg: 68, sex: "undisclosed", primaryGoal: "strength", experience: "beginner", recoveryContext: "reduced_readiness" });

    expect(mocks.saveFitnessProfile).toHaveBeenCalledWith(42, expect.objectContaining({ age: 30, weightKg: 68, experience: "beginner", recoveryContext: "reduced_readiness" }));
  });
});
