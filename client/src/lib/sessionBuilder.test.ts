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

  it("connects low-noise no-jump whole-body circuit options at home", () => {
    const homeEndurance = buildSession({ goal: "endurance", environment: "home", duration: 30, checkin });
    const homeAllRound = buildSession({ goal: "all_round", environment: "home", duration: 45, checkin });
    const homeStrength = buildSession({ goal: "strength", environment: "home", duration: 45, checkin });
    expect(homeEndurance.blocks[1].items.join(" ")).toContain("콰이어트 스텝 터치");
    expect(homeEndurance.blocks[1].items.join(" ")).toContain("스탠딩 섀도 복싱 이지");
    expect(homeEndurance.blocks[1].items.join(" ")).toContain("사이드 투 사이드 토 탭");
    expect(homeAllRound.blocks[1].items.join(" ")).toContain("월 푸시업 마치 이지");
    expect(homeAllRound.blocks[1].items.join(" ")).toContain("지지 컨트롤 스텝백 탭");
    expect(homeStrength.blocks[1].items.join(" ")).toContain("콰이어트 힙 힌지 리치");
  });

  it("connects floor-transfer, isometric, shoulder-stability, and calf-control options at home", () => {
    const homeStrength = buildSession({ goal: "strength", environment: "home", duration: 45, checkin });
    const homeAllRound = buildSession({ goal: "all_round", environment: "home", duration: 45, checkin });
    expect(homeStrength.blocks[1].items.join(" ")).toContain("솔레우스 월 레이즈 이지");
    expect(homeStrength.blocks[1].items.join(" ")).toContain("데드 버그 아이소메트릭 프레스");
    expect(homeStrength.blocks[1].items.join(" ")).toContain("베어 플랭크 스캐풀라 프로트랙션");
    expect(homeAllRound.blocks[1].items.join(" ")).toContain("티비알리스 월 레이즈 이지");
    expect(homeAllRound.blocks[1].items.join(" ")).toContain("월 슬라이드 리프트오프 이지");
    expect(homeAllRound.blocks[1].items.join(" ")).toContain("지지 하프 니링 투 스탠드");
  });

  it("connects seated recovery, self-resisted pull, wrist-friendly core, and tight-space options at home", () => {
    const homeStrength = buildSession({ goal: "strength", environment: "home", duration: 45, checkin });
    const homeAllRound = buildSession({ goal: "all_round", environment: "home", duration: 45, checkin });
    expect(homeStrength.blocks[1].items.join(" ")).toContain("포어암 플랭크 니 홀드");
    expect(homeStrength.blocks[1].items.join(" ")).toContain("수파인 90·90 힐 프레스");
    expect(homeAllRound.blocks[1].items.join(" ")).toContain("시티드 펠빅 틸트 이지");
    expect(homeAllRound.blocks[1].items.join(" ")).toContain("셀프 레지스티드 로우 이지");
    expect(homeAllRound.blocks[1].items.join(" ")).toContain("월 스노우 엔젤 이지");
    expect(homeAllRound.blocks[1].items.join(" ")).toContain("지지 스탠딩 클락 리치");
  });

  it("connects hip-control, knee-friendly, forearm-support, and transition options at home", () => {
    const homeStrength = buildSession({ goal: "strength", environment: "home", duration: 45, checkin });
    const homeAllRound = buildSession({ goal: "all_round", environment: "home", duration: 45, checkin });
    expect(homeStrength.blocks[1].items.join(" ")).toContain("글루트 브리지 애덕션 스퀴즈 이지");
    expect(homeStrength.blocks[1].items.join(" ")).toContain("지지 스쿼트 펄스 이지");
    expect(homeStrength.blocks[1].items.join(" ")).toContain("월 쿼드 셋 이지");
    expect(homeStrength.blocks[1].items.join(" ")).toContain("포어암 테이블탑 홀드 이지");
    expect(homeAllRound.blocks[1].items.join(" ")).toContain("니링 힙 시프트 클락");
    expect(homeAllRound.blocks[1].items.join(" ")).toContain("전완 월 슬라이드 이지");
    expect(homeAllRound.blocks[1].items.join(" ")).toContain("지지 스쿼트 투 하프 니");
  });

  it("connects low-impact endurance and wall-or-chair reinforcement options at home", () => {
    const homeStrength = buildSession({ goal: "strength", environment: "home", duration: 45, checkin });
    const homeAllRound = buildSession({ goal: "all_round", environment: "home", duration: 45, checkin });
    expect(homeStrength.blocks[1].items.join(" ")).toContain("체어 지지 힙 힌지 탭");
    expect(homeStrength.blocks[1].items.join(" ")).toContain("체어 인클라인 스캐풀라 푸시업 이지");
    expect(homeStrength.blocks[1].items.join(" ")).toContain("월 싯 얼터네이팅 힐 리프트 이지");
    expect(homeAllRound.blocks[1].items.join(" ")).toContain("체어 싯 투 스탠드 포즈 이지");
    expect(homeAllRound.blocks[1].items.join(" ")).toContain("월 엘보 로우 아이소메트릭 이지");
    expect(homeAllRound.blocks[1].items.join(" ")).toContain("타월 셀프 로우 시티드 이지");
    expect(homeAllRound.blocks[1].items.join(" ")).toContain("월 힙 어브덕션 홀드 이지");
  });

  it("connects no-equipment back-and-arm endurance with low-load hip-or-knee options at home", () => {
    const homeStrength = buildSession({ goal: "strength", environment: "home", duration: 45, checkin });
    const homeAllRound = buildSession({ goal: "all_round", environment: "home", duration: 45, checkin });
    expect(homeStrength.blocks[1].items.join(" ")).toContain("프론 엘보 풀백 홀드 이지");
    expect(homeStrength.blocks[1].items.join(" ")).toContain("시티드 바이셉스 아이소메트릭 컬 이지");
    expect(homeStrength.blocks[1].items.join(" ")).toContain("체어 햄스트링 힐 딕 이지");
    expect(homeStrength.blocks[1].items.join(" ")).toContain("수파인 힐 슬라이드 이지");
    expect(homeAllRound.blocks[1].items.join(" ")).toContain("프론 스위머 스윕 이지");
    expect(homeAllRound.blocks[1].items.join(" ")).toContain("월 노 머니 외회전 이지");
    expect(homeAllRound.blocks[1].items.join(" ")).toContain("체어 지지 니 벤드 탭");
  });

  it("connects forearm-grip endurance and low-load hip-or-knee control options at home", () => {
    const homeStrength = buildSession({ goal: "strength", environment: "home", duration: 45, checkin });
    const homeEndurance = buildSession({ goal: "endurance", environment: "home", duration: 30, checkin });
    const homeAllRound = buildSession({ goal: "all_round", environment: "home", duration: 45, checkin });
    expect(homeStrength.blocks[1].items.join(" ")).toContain("시티드 손목 굴곡 아이소메트릭 이지");
    expect(homeStrength.blocks[1].items.join(" ")).toContain("피스트 스퀴즈 아이소메트릭 이지");
    expect(homeEndurance.blocks[1].items.join(" ")).toContain("체어 서포티드 사이드 스텝 터치");
    expect(homeEndurance.blocks[1].items.join(" ")).toContain("시티드 앵클 펌프 마치 이지");
    expect(homeAllRound.blocks[1].items.join(" ")).toContain("시티드 손목 신전 아이소메트릭 이지");
    expect(homeAllRound.blocks[1].items.join(" ")).toContain("월 서포티드 힙 서클 이지");
    expect(homeAllRound.blocks[1].items.join(" ")).toContain("엄지 대립 탭 이지");
  });

  it("connects hand-or-wrist friendly and seated recovery coordination options at home", () => {
    const homeStrength = buildSession({ goal: "strength", environment: "home", duration: 45, checkin });
    const homeEndurance = buildSession({ goal: "endurance", environment: "home", duration: 30, checkin });
    const homeAllRound = buildSession({ goal: "all_round", environment: "home", duration: 45, checkin });
    expect(homeStrength.blocks[1].items.join(" ")).toContain("시티드 핸드 텐던 글라이드 이지");
    expect(homeStrength.blocks[1].items.join(" ")).toContain("시티드 힙 애덕션 스퀴즈 이지");
    expect(homeEndurance.blocks[1].items.join(" ")).toContain("시티드 크로스 바디 니 탭 이지");
    expect(homeEndurance.blocks[1].items.join(" ")).toContain("시티드 스텝 아웃 탭 이지");
    expect(homeAllRound.blocks[1].items.join(" ")).toContain("시티드 힐 레이즈 이지");
    expect(homeAllRound.blocks[1].items.join(" ")).toContain("시티드 손목 요측 편위 이지");
    expect(homeAllRound.blocks[1].items.join(" ")).toContain("엘보 서포티드 핸드 오픈 클로즈 이지");
  });

  it("connects solo-friendly lower-body, pull, press, shoulder, and arm machine options at the gym", () => {
    const gymStrength = buildSession({ goal: "strength", environment: "gym", duration: 45, checkin });
    const gymAllRound = buildSession({ goal: "all_round", environment: "gym", duration: 45, checkin });
    expect(gymStrength.blocks[1].items.join(" ")).toContain("핵 스쿼트 머신 이지");
    expect(gymStrength.blocks[1].items.join(" ")).toContain("머신 글루트 드라이브 이지");
    expect(gymStrength.blocks[1].items.join(" ")).toContain("플레이트 로디드 하이 로우 이지");
    expect(gymStrength.blocks[1].items.join(" ")).toContain("케이블 해머 컬 이지");
    expect(gymAllRound.blocks[1].items.join(" ")).toContain("벨트 스쿼트 머신 이지");
    expect(gymAllRound.blocks[1].items.join(" ")).toContain("머신 딥 프레스 이지");
    expect(gymAllRound.blocks[1].items.join(" ")).toContain("케이블 레터럴 레이즈 이지");
  });

  it("connects steady solo aerobic machine options to gym endurance and all-round sessions", () => {
    const gymEndurance = buildSession({ goal: "endurance", environment: "gym", duration: 30, checkin });
    const gymAllRound = buildSession({ goal: "all_round", environment: "gym", duration: 45, checkin });
    expect(gymEndurance.blocks[1].items.join(" ")).toContain("스키에르고 스테디 이지");
    expect(gymEndurance.blocks[1].items.join(" ")).toContain("암 에르고미터 이지");
    expect(gymEndurance.blocks[1].items.join(" ")).toContain("버티컬 클라이머 이지");
    expect(gymAllRound.blocks[1].items.join(" ")).toContain("에어 바이크 스테디 이지");
    expect(gymAllRound.blocks[1].items.join(" ")).toContain("커브드 트레드밀 워크 이지");
  });

  it("connects solo hinge, unilateral lower-body, and core coordination options at home", () => {
    const homeStrength = buildSession({ goal: "strength", environment: "home", duration: 45, checkin });
    const homeAllRound = buildSession({ goal: "all_round", environment: "home", duration: 45, checkin });
    expect(homeStrength.blocks[1].items.join(" ")).toContain("탈 니링 힙 힌지 이지");
    expect(homeStrength.blocks[1].items.join(" ")).toContain("지지 스플릿 스쿼트 프런트 리치");
    expect(homeStrength.blocks[1].items.join(" ")).toContain("수파인 마치 힐 탭 이지");
    expect(homeAllRound.blocks[1].items.join(" ")).toContain("지지 단일다리 RDL 리치");
    expect(homeAllRound.blocks[1].items.join(" ")).toContain("사이드 플랭크 니 리치스루");
  });
});
