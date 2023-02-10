const applyRoutes = require("../dist").applyRoutes;
const express = require("express");
const app = express();

applyRoutes(app, {
  uri: "example/api",
  static: {
    virtual: '/static',
    folders: ["example/static", "example/static2"],
  },
});

app.listen(8000);
