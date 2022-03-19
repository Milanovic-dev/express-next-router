const applyRoutes = require("../dist").applyRoutes;
const express = require("express");
const app = express();

applyRoutes(app);

app.listen(8000);
