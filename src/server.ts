import { applyRoutes } from ".";
import * as express from "express";

const app = express();

app.use(express.json());

applyRoutes(app);


app.listen(8000, () => { });
