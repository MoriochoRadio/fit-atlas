import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * fitnessData.ts 는 카탈로그 11개 페이지를 정적으로 import 하면서
 * 타입과 recoveryGuides·wellnessCards 까지 재수출한다. 그래서 화면 코드가
 * 여기서 값을 하나라도 가져오면 지연 청크가 통째로 초기 번들에 들어온다
 * (실제로 Home 청크가 402kB → 2,223kB 로 늘어난 적이 있다).
 * 타입은 catalogTypes, 콘텐츠는 catalogContent 에서 직접 가져와야 한다.
 */
const sourceRoot = path.resolve(__dirname, "..");

function collectSourceFiles(directory: string, found: string[] = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) collectSourceFiles(entryPath, found);
    else if (/\.tsx?$/.test(entry.name) && !entry.name.includes(".test."))
      found.push(entryPath);
  }
  return found;
}

/** `import type { ... }` 와 인라인 `type X` 만 있는 import 는 빌드에서 지워지므로 안전하다. */
function importsValuesFromFitnessData(source: string) {
  const statements = source.matchAll(
    /import\s+(type\s+)?\{([^}]*)\}\s+from\s+["'](?:@\/lib\/fitnessData|\.\/fitnessData|\.\.\/lib\/fitnessData)["']/g
  );
  for (const statement of statements) {
    if (statement[1]) continue;
    const members = statement[2]
      .split(",")
      .map(member => member.trim())
      .filter(Boolean);
    if (members.some(member => !member.startsWith("type "))) return true;
  }
  return /import\s+\w+\s+from\s+["'][^"']*fitnessData["']/.test(source);
}

describe("catalog code splitting", () => {
  it("keeps every source file from importing values out of fitnessData", () => {
    const offenders = collectSourceFiles(sourceRoot)
      .filter(file => !file.endsWith(`lib${path.sep}fitnessData.ts`))
      .filter(file =>
        importsValuesFromFitnessData(fs.readFileSync(file, "utf8"))
      )
      .map(file => path.relative(sourceRoot, file));

    expect(offenders).toEqual([]);
  });
});
