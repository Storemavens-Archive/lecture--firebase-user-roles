import express from "express";
import routes from "./routes";
import cors from "cors";
import { httpLogger } from "./utils/logger";

const app = express();

app.use(express.json());
// app.use(httpLogger);
app.use(cors({}));
app.use(routes);

export default app;
