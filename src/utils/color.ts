import pc from "picocolors";

export const colorString = (s: unknown): string => pc.green(`'${String(s)}'`);
export const colorKeyword = (s: unknown): string => pc.blue(String(s));
export const colorJson = (s: unknown): string => pc.green(JSON.stringify(s));
export const colorStringArray = (a: unknown[]): string => `[ ${a.map(colorString).join(", ")} ]`;
export const colorNumber = (n: unknown): string => pc.yellow(String(n));
export const colorBoolean = (b: unknown): string => pc.yellow(b ? "true" : "false");
export const colorDate = (d: Date): string => pc.magenta(d.toISOString());
