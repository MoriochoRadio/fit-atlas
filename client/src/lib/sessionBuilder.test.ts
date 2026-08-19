import { describe, expect, it } from "vitest";
import { buildSession } from "./sessionBuilder";

const checkin = { date: "2026-08-14", energy: 4, sleep: 4, stress: 2, pain: 1 } as const;

describe("single session builder", () => {
  it("builds a bounded session with the selected duration and environment", () => {
    const plan = buildSession({ goal: "strength", environment: "gym", duration: 30, checkin });
    expect(plan.title).toContain("30분");
    expect(plan.blocks.reduce((total, block) => total + block.minutes, 0)).toBe(30);
    expect(plan.blocks[1].items.join(" ")).toContain("레그 프레스");
  });

  it("applies a lighter template when readiness is reduced", () => {
    const plan = buildSession({ goal: "all_round", environment: "home", duration: 15, checkin: { ...checkin, energy: 2, sleep: 2, stress: 4, pain: 2 } });
    expect(plan.summary).toContain("낮추고");
    expect(plan.blocks[1].items.every((item) => item.includes("가볍게"))).toBe(true);
  });

  it("prioritizes symptom-aware recovery when pain is high", () => {
    const plan = buildSession({ goal: "endurance", environment: "outdoor", duration: 45, checkin: { ...checkin, pain: 4 } });
    expect(plan.title).toContain("통증 신호");
    expect(plan.blocks.reduce((total, block) => total + block.minutes, 0)).toBe(45);
    expect(plan.blocks[1].items.join(" ")).not.toContain("걷기·달리기 인터벌");
  });

  it("surfaces expanded equipment, low-impact cardio, and coordination options in appropriate environments", () => {
    const home = buildSession({ goal: "strength", environment: "home", duration: 45, checkin });
    const gym = buildSession({ goal: "all_round", environment: "gym", duration: 45, checkin });
    const outdoor = buildSession({ goal: "all_round", environment: "outdoor", duration: 45, checkin });
    expect(home.blocks[1].items.join(" ")).toContain("케틀벨 데드리프트");
    expect(home.blocks[1].items.join(" ")).toContain("발 지지 오버핸드 풀업");
    expect(gym.blocks[1].items.join(" ")).toContain("케이블 싱글 암 로우");
    expect(gym.blocks[1].items.join(" ")).toContain("유니래터럴 레그 프레스");
    expect(gym.blocks[1].items.join(" ")).toContain("케이블 싱글 암 체스트 프레스");
    expect(gym.blocks[1].items.join(" ")).toContain("일립티컬 이지");
    expect(gym.blocks[1].items.join(" ")).toContain("유니래터럴 레그 프레스");
    expect(gym.blocks[1].items.join(" ")).toContain("트레드밀 템포 워크");
    expect(outdoor.blocks[1].items.join(" ")).toContain("난간 지지 스텝업");
    expect(outdoor.blocks[1].items.join(" ")).toContain("컨트롤 다운힐 워크");
  });

  it("connects the recent home, gym, and outdoor individual exercise variants", () => {
    const home = buildSession({ goal: "strength", environment: "home", duration: 45, checkin });
    const gym = buildSession({ goal: "strength", environment: "gym", duration: 45, checkin });
    const outdoor = buildSession({ goal: "endurance", environment: "outdoor", duration: 45, checkin });
    expect(home.blocks[1].items.join(" ")).toContain("지지 풀업 네거티브");
    expect(home.blocks[1].items.join(" ")).toContain("발 지지 풀업 포즈 래더");
    expect(gym.blocks[1].items.join(" ")).toContain("케이블 스탠딩 힙 어브덕션");
    expect(outdoor.blocks[1].items.join(" ")).toContain("200m 런·워크 이지");
    expect(outdoor.blocks[1].items.join(" ")).toContain("400m 런·워크");
  });

  it("includes the current squat, push, incline-walk, and machine progression variants", () => {
    const home = buildSession({ goal: "strength", environment: "home", duration: 45, checkin });
    const gymStrength = buildSession({ goal: "strength", environment: "gym", duration: 45, checkin });
    const gymEndurance = buildSession({ goal: "endurance", environment: "gym", duration: 30, checkin });
    expect(home.blocks[1].items.join(" ")).toContain("지지 피스톨 스쿼트 투 박스");
    expect(home.blocks[1].items.join(" ")).toContain("지지 풀업 네거티브");
    expect(gymStrength.blocks[1].items.join(" ")).toContain("어시스트 뉴트럴 그립 풀업 머신");
    expect(gymStrength.blocks[1].items.join(" ")).toContain("머신 앱 크런치");
    expect(gymEndurance.blocks[1].items.join(" ")).toContain("트레드밀 조그·워크 인터벌");
  });

  it("connects advanced bodyweight, distance-based running, and unilateral machine options", () => {
    const home = buildSession({ goal: "all_round", environment: "home", duration: 45, checkin });
    const outdoor = buildSession({ goal: "endurance", environment: "outdoor", duration: 45, checkin });
    const gym = buildSession({ goal: "all_round", environment: "gym", duration: 45, checkin });
    expect(home.blocks[1].items.join(" ")).toContain("아처 푸시업 프렙");
    expect(home.blocks[1].items.join(" ")).toContain("지지 Y 밸런스 리치");
    expect(outdoor.blocks[1].items.join(" ")).toContain("200m 런·워크 이지");
    expect(outdoor.blocks[1].items.join(" ")).toContain("400m 런·워크");
    expect(gym.blocks[1].items.join(" ")).toContain("유니래터럴 레그 프레스");
    expect(gym.blocks[1].items.join(" ")).toContain("케이블 싱글 암 체스트 프레스");
  });

  it("connects supported pull-up progressions and advanced balance variants", () => {
    const homeStrength = buildSession({ goal: "strength", environment: "home", duration: 45, checkin });
    const homeAllRound = buildSession({ goal: "all_round", environment: "home", duration: 45, checkin });
    const gym = buildSession({ goal: "strength", environment: "gym", duration: 45, checkin });
    expect(homeStrength.blocks[1].items.join(" ")).toContain("지지 풀업 네거티브");
    expect(homeStrength.blocks[1].items.join(" ")).toContain("발 지지 풀업 포즈 래더");
    expect(homeAllRound.blocks[1].items.join(" ")).toContain("지지 Y 밸런스 리치");
    expect(homeAllRound.blocks[1].items.join(" ")).toContain("지지 레터럴 런지");
    expect(gym.blocks[1].items.join(" ")).toContain("어시스트 뉴트럴 그립 풀업 머신");
  });

  it("connects advanced pull-up transition and grip variation options", () => {
    const homeStrength = buildSession({ goal: "strength", environment: "home", duration: 45, checkin });
    const homeAllRound = buildSession({ goal: "all_round", environment: "home", duration: 45, checkin });
    const gymStrength = buildSession({ goal: "strength", environment: "gym", duration: 45, checkin });
    const gymAllRound = buildSession({ goal: "all_round", environment: "gym", duration: 45, checkin });
    expect(homeStrength.blocks[1].items.join(" ")).toContain("발 지지 오버핸드 풀업");
    expect(homeStrength.blocks[1].items.join(" ")).toContain("발 지지 풀업 포즈 래더");
    expect(homeAllRound.blocks[1].items.join(" ")).toContain("로우 바 그립 전환 로우");
    expect(gymStrength.blocks[1].items.join(" ")).toContain("어시스트 뉴트럴 그립 풀업 머신");
    expect(gymAllRound.blocks[1].items.join(" ")).toContain("어시스트 뉴트럴 그립 풀업 머신");
  });

  it("connects varied squat, hinge, core, and coordination bodyweight options", () => {
    const homeStrength = buildSession({ goal: "strength", environment: "home", duration: 45, checkin });
    const homeAllRound = buildSession({ goal: "all_round", environment: "home", duration: 45, checkin });
    expect(homeStrength.blocks[1].items.join(" ")).toContain("맨몸 굿모닝");
    expect(homeStrength.blocks[1].items.join(" ")).toContain("지지 레터럴 런지");
    expect(homeStrength.blocks[1].items.join(" ")).toContain("데드 버그 콘트랄래터럴 리치");
    expect(homeAllRound.blocks[1].items.join(" ")).toContain("스쿼트 투 카프 레이즈");
    expect(homeAllRound.blocks[1].items.join(" ")).toContain("베어 크롤 포워드 이지");
  });

  it("connects bodyweight push, arm, lower-endurance, and core-transition options", () => {
    const homeStrength = buildSession({ goal: "strength", environment: "home", duration: 45, checkin });
    const homeAllRound = buildSession({ goal: "all_round", environment: "home", duration: 45, checkin });
    expect(homeStrength.blocks[1].items.join(" ")).toContain("내로우 인클라인 푸시업 이지");
    expect(homeStrength.blocks[1].items.join(" ")).toContain("지지 스플릿 스쿼트 홀드");
    expect(homeStrength.blocks[1].items.join(" ")).toContain("니 플랭크 업다운");
    expect(homeAllRound.blocks[1].items.join(" ")).toContain("월 싯 카프 레이즈 이지");
    expect(homeAllRound.blocks[1].items.join(" ")).toContain("카운터 맨몸 트라이셉스 익스텐션");
    expect(homeAllRound.blocks[1].items.join(" ")).toContain("하이 플랭크 니 투 엘보 이지");
  });
});
