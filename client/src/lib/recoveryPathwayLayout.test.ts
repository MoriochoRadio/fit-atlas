import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * 이전 구현은 CSS 원문을 한 줄 문자열로 그대로 비교해서, 코드 포매팅만 바뀌어도
 * 깨졌다. 공백을 정규화한 뒤 필요한 선언이 있는지만 확인해 형식 변화에
 * 영향받지 않게 한다.
 */
const css = readFileSync(resolve(import.meta.dirname, "..", "index.css"), "utf8");
const squish = (value: string) => value.replace(/\s+/g, " ").trim();

/** source 안에서 selector 블록의 선언부를 공백 정규화해 돌려준다. */
function ruleBody(selector: string, source: string): string | null {
  let from = 0;
  while (from < source.length) {
    const at = source.indexOf(selector, from);
    if (at === -1) return null;
    const before = at === 0 ? "" : source[at - 1];
    const open = source.indexOf("{", at + selector.length);
    const between = open === -1 ? "x" : source.slice(at + selector.length, open).trim();
    // 셀렉터 경계이고( 앞이 구분자 ) 바로 뒤가 여는 중괄호인 경우만 인정한다.
    if ((before === "" || "{};, ".includes(before)) && between === "" && open !== -1) {
      const close = source.indexOf("}", open);
      return squish(source.slice(open + 1, close));
    }
    from = at + selector.length;
  }
  return null;
}

const flat = squish(css);

describe("recovery pathway responsive layout", () => {
  it("데스크톱에서 3열 그리드를 유지한다", () => {
    const body = ruleBody(".pathway-grid", flat);
    expect(body).toBeTruthy();
    expect(body).toContain("display: grid");
    expect(body).toContain("grid-template-columns: 1.05fr 1fr 1fr");
  });

  it("760px 이하에서 1열로 떨어진다", () => {
    const at = flat.indexOf("@media (max-width: 760px)");
    expect(at).toBeGreaterThan(-1);
    const scoped = flat.slice(at, at + 4000);
    expect(ruleBody(".pathway-grid", scoped)).toContain("grid-template-columns: 1fr");
    expect(ruleBody(".recovery-pathway", scoped)).toContain("padding: 20px");
  });
});
