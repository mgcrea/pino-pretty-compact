import * as color from "kolorist";

export const colorString = (s: unknown): string => color.green(`'${s}'`);
export const colorKeyword = (s: unknown): string => color.blue(`${s}`);
export const colorJson = (s: unknown): string => color.green(JSON.stringify(s));
export const colorStringArray = (a: Array<unknown>): string => `[ ${a.map(colorString).join(", ")} ]`;
export const colorNumber = (n: unknown): string => color.yellow(`${n}`);
export const colorBoolean = (b: unknown): string => color.yellow(b ? "true" : "false");
export const colorDate = (d: Date): string => color.magenta(d.toISOString());
