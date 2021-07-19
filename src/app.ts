import express from "express";
import routes from "./routes";
import { httpLogger } from "./utils/logger";


const app = express();

app.use(httpLogger);
app.use(routes);


export default app;
