import { describe, expect, test } from "vitest";

describe("module", () => {
  test("src exports", async () => {
    const module = await import("../../src");
    expect(Object.keys(module)).toMatchInlineSnapshot(`
      [
        "colorString",
        "colorKeyword",
        "colorJson",
        "colorStringArray",
        "colorNumber",
        "colorBoolean",
        "colorDate",
        "default",
      ]
    `);
  });
  test("dist exports", async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const module = await import("../../dist");
    expect(Object.keys(module)).toMatchInlineSnapshot(`
      [
        "colorBoolean",
        "colorDate",
        "colorJson",
        "colorKeyword",
        "colorNumber",
        "colorString",
        "colorStringArray",
        "default",
      ]
    `);
  });
});
