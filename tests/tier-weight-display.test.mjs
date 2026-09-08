import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const tvSource = fs.readFileSync(new URL("../app/tv/page.tsx", import.meta.url), "utf8");

test("top-tier TV highlights display the 6g bag while AA remains 5g", () => {
  assert.match(tvSource, /<span>\{isTop3 \? "6g" : "5g"\}/);
  assert.match(tvSource, /isAA \? <span className=\{styles\.headerDeal\}>\$20 5g AA<\/span>/);
  assert.match(tvSource, /<span className=\{styles\.pLab\}>5g<\/span>/);
});
