import { Router } from "express";
import config from "./config";

const routes = Router();

routes.get("/", (req, res) => {
  res.send(`Server is up and running on port ${config.port}`);
});

export default routes;