import pino from "pino";
import { describe, expect, it, vi } from "vitest";

describe("with pino directly", () => {
  it("should properly work when passed as a transpord", async () => {
    const log = pino({ level: "debug", transport: { target: "@mgcrea/pino-pretty-compact" } });
    expect(log).toBeDefined();
    const spy = vi.spyOn(log, "info");
    log.info("foo");
    expect(spy).toHaveBeenCalledOnce();
  });
});
