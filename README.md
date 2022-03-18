Next.js API routing style adaptation for [Node](https://nodejs.org/en/) and [Express](http://expressjs.com/)

Inspired by [Next.js](https://nextjs.org/docs/getting-started) by Vercel

```js
const applyRoutes = require("express-next-router").applyRoutes;
const express = require("express");
const app = express();

applyRoutes(app);

app.listen(8000);
```

## Installation

First, install express

```console
$ npm install express
```

Then, install the package

```console
$ npm install express-next-router
```

You're done!

## Quick Start

With express-next-router, api endpoint is a javascript function exported from `.js` or `.ts` file in `api` directory. Each route is created based on it's file name.

To start, create a directory named `api` in the root of your express project.

Create a `api/health.js` that exports a `get` function like below:

```js
// api/health.js

module.exports = {
  get: (req, res) => {
    res.status(200).send("ok");
  },
};
```

Endpoint will be accessible at GET /api/health

To make sure your routes are applied to the express router, call `applyRoutes`
and pass your express app

```js
// server.js

const applyRoutes = require("express-next-router").applyRoutes;
const express = require("express");
const app = express();

applyRoutes(app);
// -> App is populated with routes after the call

app.listen(8000);
```

After your run server.js, you should see the output below in your terminal:

```console
🕐 Collecting your routes.
Press Ctrl+C to cancel.

➜ GET /api/health

✓ Routed (2ms)
```

Now you can test your endpoint at localhost:

```console
$ curl http://localhost:8000/api/health
ok
```

Thats it! You've successfully created a GET endpoint

## Features

### Endpoints and Methods

In order to create different REST methods, export a function with name one of the
methods:

- get
- post
- put
- delete
- patch
- all (accepts all methods)

### Middleware

### Dynamic Routes

To create a dymanic route, create a file or called `api/dogs/[dogId].js`,
then it will be accessible at `/api/dogs/1` or `/api/dogs/2`

## ES Modules

If you don't want to use CommonJS, you can also write your apis as ES Modules

```js
// api/dogs.js

export default {
  get: (req, res) => {
    res.status(200).send("I'm GET");
  },
  post: (req, res) => {
    res.status(200).send("I'm POST");
  },
  patch: (req, res) => {
    res.status(200).send("I'm PATCH");
  },
};
```

or

```js
// api/dogs.js

export const get = (req, res) => {
  res.status(200).send("I'm GET");
};

export const post = (req, res) => {
  res.status(200).send("I'm POST");
};

export const patch = (req, res) => {
  res.status(200).send("I'm PATCH");
};
```

If you want accept any method, with ES Modules you can export default a function:

```js
// api/dogs.js

export default function handler(req, res) {
  console.log(req.method);
  res.status(200).send();
}
```

## Limitations

Because we define our endpoints through files and directories, express wildcard is **not** supported, as it is not a valid character when naming files. However you can still use express app instance to add as you normally would.

## License

[MIT](LICENSE)
