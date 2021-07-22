import { Router } from "express";
import authMiddleware from "./auth.middleware";
import config from "./config";
import { createStory, getStories } from "./controllers/story.controller";
import logger from "./utils/logger";

const routes = Router();

// This doesn't go through auth middleware
routes.get("/", (req, res) => {
  res.send(`Server is up and running on port ${config.port}`);
});

routes.use(authMiddleware);
export default routes;
