# PinoPrettyCompact

<!-- markdownlint-disable MD033 -->
<p align="center">
  <a href="https://www.npmjs.com/package/@mgcrea/pino-pretty-compact">
    <img src="https://img.shields.io/npm/v/@mgcrea/pino-pretty-compact.svg?style=for-the-badge" alt="npm version" />
  </a>
  <a href="https://www.npmjs.com/package/@mgcrea/pino-pretty-compact">
    <img src="https://img.shields.io/npm/dt/@mgcrea/pino-pretty-compact.svg?style=for-the-badge" alt="npm total downloads" />
  </a>
  <a href="https://www.npmjs.com/package/@mgcrea/pino-pretty-compact">
    <img src="https://img.shields.io/npm/dm/@mgcrea/pino-pretty-compact.svg?style=for-the-badge" alt="npm monthly downloads" />
  </a>
  <a href="https://www.npmjs.com/package/@mgcrea/pino-pretty-compact">
    <img src="https://img.shields.io/npm/l/@mgcrea/pino-pretty-compact.svg?style=for-the-badge" alt="npm license" />
  </a>
  <br />
  <a href="https://github.com/mgcrea/pino-pretty-compact/actions/workflows/main.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/mgcrea/pino-pretty-compact/main.yml?style=for-the-badge&branch=master" alt="build status" />
  </a>
  <a href="https://depfu.com/github/mgcrea/pino-pretty-compact">
    <img src="https://img.shields.io/depfu/dependencies/github/mgcrea/pino-pretty-compact?style=for-the-badge" alt="dependencies status" />
  </a>
</p>
<!-- markdownlint-enable MD037 -->

## Features

Compact pino-based prettifier for [fastify](https://github.com/fastify/fastify).

- Relies on [kolorist](https://github.com/marvinhagemeister/kolorist) for the coloring.

- Usually used along [@mgcrea/fastify-request-logger](https://github.com/mgcrea/fastify-request-logger) to log requests.

- Built with [TypeScript](https://www.typescriptlang.org/) for static type checking with exported types along the
  library.

## Preview

<p align="left">
  <img src="https://raw.githubusercontent.com/mgcrea/pino-pretty-compact/master/docs/preview.png" alt="Preview" />
</p>

## Usage

```bash
npm install @mgcrea/pino-pretty-compact @mgcrea/fastify-request-logger --save
# or
pnpm add @mgcrea/pino-pretty-compact @mgcrea/fastify-request-logger
```

```ts
import createFastify, { FastifyInstance, FastifyServerOptions } from "fastify";
import fastifyRequestLogger from "@mgcrea/fastify-request-logger";
import prettifier from "@mgcrea/pino-pretty-compact";

export const buildFastify = (options: FastifyServerOptions = {}): FastifyInstance => {
  const fastify = createFastify({
    logger: {
      level: "debug",
      transport: {
        target: "@mgcrea/pino-pretty-compact",
        options: {
          translateTime: "HH:MM:ss Z",
          ignore: "pid,hostname",
        },
      },
    },
    ...options,
  });

  fastify.register(fastifyRequestLogger);

  return fastify;
};
```

### Options

You can use any [PinoPrettyOptions](https://github.com/pinojs/pino-pretty/blob/v9.1.1/index.d.ts#L38)

## Authors

- [Olivier Louvignes](https://github.com/mgcrea) <<olivier@mgcrea.io>>

### Credits

Heavily inspired from

- [pino-pretty](https://github.com/pinojs/pino-pretty) by [Matteo Collina](https://github.com/mcollina)

## License

```txt
The MIT License

Copyright (c) 2020 Olivier Louvignes <olivier@mgcrea.io>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
