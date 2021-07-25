import { Router } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import authMiddleware from "./auth.middleware";
import config from "./config";
import {
  createStory,
  getAllStories,
  getStory,
} from "./controllers/story.controller";
import logger from "./utils/logger";

const routes = Router();

// This doesn't go through auth middleware
routes.get("/", (req, res) => {
  res.send(`Server is up and running on port ${config.port}`);
});

routes.use(authMiddleware);

// This DOES go through auth middleware

routes.get("/stories", async (req, res) => {
  try {
    const stories = await getAllStories();
    res.json({ stories });
  } catch (error) {
    res.json({ error: error.message });
  }
});

routes.get("/stories/:storyId", async (req, res) => {
  try {
    const { storyId } = req.params;
    const story = await getStory(storyId, res.locals.userId);
    res.json({ story });
  } catch (error) {
    if (error.message === "forbidden") {
      res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: ReasonPhrases.FORBIDDEN });
    } else {
      res.json({ error: error.message });
    }
  }
});

routes.post("/stories", async (req, res) => {
  try {
    const { story } = req.body;
    logger.debug(story, "req.body");
    // res.locals.userId comes from auth middleWare
    const newStory = await createStory(res.locals.userId, story);

    res.json({ story: newStory });
  } catch (error) {
    res.json({ error: error.message });
  }
});

export default routes;
