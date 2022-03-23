const applyRoutes = require("../dist").applyRoutes;
const express = require("express");
const app = express();

applyRoutes(app, { customUri: "/example/api" });

app.listen(8000);
