Next.js API routing style adaptation for Node and Express [express](http://expressjs.com/)

Inspired by [Next.js](https://nextjs.org/docs/getting-started) by Vercel

[![NPM Version][npm-version-image]][npm-url]
[![NPM Install Size][npm-install-size-image]][npm-install-size-url]
[![NPM Downloads][npm-downloads-image]][npm-downloads-url]

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

A REST api Route is a javascript function exported from ".js" or ".ts" file in "api" directory. Each route is created based on it's file name.

To start, create a directory named "api" in the root of your express project.

Create a "api/health.js" that exports a "get" function like below, it will be
accessible at GET /api/health

```js
module.exports = {
  get: (req, res) => {
    res.status(200).send("ok");
  },
};
```

To make sure your routes are applied to the express router, call applyRoutes
and pass your express instance

```js
const applyRoutes = require("express-next-router").applyRoutes;
const express = require("express");
const app = express();

applyRoutes(app);

app.listen(8000);
```

## Features

### REST Methods

In order to create different REST methods, export a function with name one of the
methods:

- get
- post
- put
- delete
- patch
- all (accepts all methods)

### Dynamic Routes

To create a dymanic route, create a file or called "api/dogs/[dogId].js",
then it will be accessible at "/api/dogs/:dogId"
