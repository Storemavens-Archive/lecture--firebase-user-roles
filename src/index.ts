import app from "./app";
import config from "./config";
import logger from "./utils/logger";

const startServer = async () => {
  app.listen(config.port, () => {
    logger.info(`server started on port ${config.port}`);
  });
};

startServer();
