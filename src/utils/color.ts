import * as color from "kolorist";

export const colorString = (s: unknown): string => color.green(`'${String(s)}'`);
export const colorKeyword = (s: unknown): string => color.blue(String(s));
export const colorJson = (s: unknown): string => color.green(JSON.stringify(s));
export const colorStringArray = (a: unknown[]): string => `[ ${a.map(colorString).join(", ")} ]`;
export const colorNumber = (n: unknown): string => color.yellow(String(n));
export const colorBoolean = (b: unknown): string => color.yellow(b ? "true" : "false");
export const colorDate = (d: Date): string => color.magenta(d.toISOString());
