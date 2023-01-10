import { buildFastify } from "test/fixtures";

describe("with fastify path", () => {
  const context = new Map<string, any>([
    ["payload", { foo: "bar" }],
    ["token", "abc"],
  ]);
  const fastify = buildFastify({});
  afterAll(() => {
    fastify.close();
  });
  it("should properly log a GET request", async () => {
    const response = await fastify.inject({
      method: "GET",
      url: "/",
      headers: {
        authorization: `Bearer ${context.get("token")}`,
      },
    });
    expect(response.statusCode).toEqual(200);
  });
  it("should properly log a POST request", async () => {
    const response = await fastify.inject({
      method: "POST",
      url: "/",
      payload: context.get("payload"),
    });
    expect(response.statusCode).toEqual(200);
  });
  it("should properly log a 400 error", async () => {
    const response = await fastify.inject({
      method: "GET",
      url: "/400",
    });
    expect(response.statusCode).toEqual(400);
  });
  it("should properly log a 500 error", async () => {
    const response = await fastify.inject({
      method: "GET",
      url: "/500",
    });
    expect(response.statusCode).toEqual(500);
  });
  it("should properly log a 404 error", async () => {
    const response = await fastify.inject({
      method: "GET",
      url: "/404",
    });
    expect(response.statusCode).toEqual(404);
  });
  it("should silence log", async () => {
    const response = await fastify.inject({
      method: "GET",
      url: "/silent",
    });
    expect(response.statusCode).toEqual(200);
  });
});
