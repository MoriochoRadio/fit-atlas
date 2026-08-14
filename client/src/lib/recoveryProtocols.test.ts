import { describe, expect, it } from "vitest";
import { recoveryGuides } from "./fitnessData";
import { recoveryProtocols } from "./recoveryProtocols";

describe("recovery protocols", () => {
  it("provides five safety-separated recovery domains for every mapped body region", () => {
    expect(Object.keys(recoveryProtocols).sort()).toEqual(Object.keys(recoveryGuides).sort());
    Object.values(recoveryProtocols).forEach((protocol) => {
      expect(protocol.stretch).toHaveLength(3);
      expect(protocol.foamRoller).toHaveLength(2);
      expect(protocol.massageGun).toHaveLength(2);
      expect(protocol.loadManagement).toHaveLength(2);
      expect(protocol.redFlags).toHaveLength(2);
    });
  });
});
