# PinoPrettyCompact

[![npm version](https://img.shields.io/npm/v/@mgcrea/pino-pretty-compact.svg)](https://github.com/mgcrea/pino-pretty-compact/releases)
[![license](https://img.shields.io/npm/l/@mgcrea/pino-pretty-compact)](https://tldrlegal.com/license/mit-license)
[![build status](https://img.shields.io/github/actions/workflow/status/mgcrea/pino-pretty-compact/main.yml?branch=master)](https://github.com/mgcrea/pino-pretty-compact/actions)
[![dependencies status](https://img.shields.io/librariesio/github/mgcrea/pino-pretty-compact)](https://libraries.io/github/mgcrea/pino-pretty-compact#dependencies)

Compact pino-based prettifier for [fastify](https://github.com/fastify/fastify).

- Relies on [chalk](https://github.com/chalk/chalk) for the coloring.

- Usually used along [@mgcrea/fastify-request-logger](https://github.com/mgcrea/fastify-request-logger) to log requests.

- Built with [TypeScript](https://www.typescriptlang.org/) for static type checking with exported types along the
  library.

## Preview

<p align="left">
  <img src="https://raw.githubusercontent.com/mgcrea/pino-pretty-compact/master/docs/preview.png" alt="Preview" />
</p>

## Usage

```bash
npm install fastify-cookie @mgcrea/pino-pretty-compact --save
# or
yarn add fastify-cookie @mgcrea/pino-pretty-compact
```

```ts
import createFastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import prettifier from '@mgcrea/pino-pretty-compact';

export const buildFastify = (options: FastifyServerOptions = {}): FastifyInstance => {
  const fastify = createFastify({
    logger: { level: 'debug', transport: { target: '@mgcrea/pino-pretty-compact', options: {} } },
    ...options,
  });

  return fastify;
};
```

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
