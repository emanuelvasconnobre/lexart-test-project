// .env variables
import dotenv from "dotenv";
dotenv.config();

// decorators
import "reflect-metadata";
import "module-alias/register";

import express from "express";
import { sequelize } from "@modules/config/sequelize";
import { exceptionMiddleware } from "@modules/middlewares";
import {
  registerControllersHandler,
  registerLibrariesHandler,
  sessionHandler,
  swaggerHandler,
} from "@modules/main/handlers";
import { logger } from "@modules/config/winston";

const app = express();
const port = process.env["PORT"] || 3000;

app.use(express.json());

const initializeServer = async () => {
  await sequelize.sync();

  // Handlers
  sessionHandler(app);
  registerLibrariesHandler(app);
  await registerControllersHandler(app);
  swaggerHandler(app);

  // Exception Middleware
  app.use(exceptionMiddleware);

  app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
  });
};

initializeServer();

export default app;