Lightweight folder-based API routing style for [Node](https://nodejs.org/en/) and [Express](http://expressjs.com/)

This package is [TS](https://www.typescriptlang.org/) compatible. Examples are in Javascript but it can be applied the same for Typescript.

```js
const applyRoutes = require("express-next-router").applyRoutes;
const express = require("express");
const app = express();

applyRoutes(app);

app.listen(8000);
```

## Prerequisite

It's recommended to get familiar with the Express framework first [Express.js](https://expressjs.com/), as
this package builds upon it.

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

### Dynamic Routes

To match a dynamic segment, you can use the bracket syntax. This allows you to match named parameters.

- `api/posts/[slug].js` → `/api/posts/:slug` (Exp: /api/posts/1)
- `api/[postId]/author.js` → `/api/:postId/author` (Exp: /api/2/author)

All parameters will be accessible at express request object (req.params)

### Middleware

To include middleware in your routes:

1. create a `_middleware.js` file inside `/api` directory, or any folder inside `/api`

2. export a function from the `_middleware.js` file:

```js
export default function middleware(req, res, next) {
  console.log("I'm a middleware!");
  next();
}
```

Middleware will only affect endpoints that are in the same directory as `_middleware.js` file

To include middleware at method level, export an array of functions instead of
a single function:

```js
module.exports = {
  get: [
    (req, res, next) => {
      console.log("Middleware");
      next();
    },
    (req, res) => {
      console.log("Route handler");
      res.status(200).send();
    },
  ],
};
```

### ES Modules

If you don't want to use CommonJS, you can also write your apis as ES Modules

```js
// api/posts.js

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
// api/posts.js

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

After running your server, you should see the output below:

```console
➜ GET /api/posts
➜ POST /api/posts
➜ PATCH /api/posts
✓ Routed (2ms)
```

If you want to accept any method, with ES Modules you can export default a function:

```js
// api/posts.js

export default function handler(req, res) {
  console.log(req.method);
  res.status(200).send();
}
```

### Static files

If you want to include static files, you can use `static` option and specify your static folders:

```
applyRoutes(app, {
  static: {
    folders: ["example/static", "example/static2"],
  },
});
```

After this, your static files should be available from:

http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html

If you want all static files to be server from one folder, you can use express virtual uri:

```
applyRoutes(app, {
  uri: "example/api",
  static: {
    virtual: '/static',
    folders: ["example/static", "example/static2"],
  },
});
```

After this, your static files should be available from:

http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html

## Limitations

Because we define our endpoints through files and directories, express wildcard `*` is **not** supported, as it is not a valid character when naming files.

However you can still use express app instance to add routes as you normally would.

# API References

You can pass an options object to the `applyRoutes` as second parameter:

| Key                |                                                             Description                                                              |
| ------------------ | :----------------------------------------------------------------------------------------------------------------------------------: |
| uri (string)       | Relative path where to look for your api folder. Use this if you don't want to put your api folder in root folder (Example: src/api) |
| static (StaticOptions) | Configuration for static files                                                                                                   |
| logger (boolean)   |                                                            Enable logging                                                            |

## License

[MIT](LICENSE)
