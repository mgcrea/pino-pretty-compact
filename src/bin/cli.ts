#!/usr/bin/env node

import { pipeline } from "node:stream/promises";
import { build } from "../prettifier";

const stream = build({});

const main = async () => {
  await pipeline(process.stdin, stream);
};

void main();
