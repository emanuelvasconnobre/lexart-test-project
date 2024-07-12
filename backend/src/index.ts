// .env variables
import dotenv from "dotenv";
dotenv.config();

// decorators
import "reflect-metadata";

import express from "express";
import { sequelize } from "@config/sequelize";
import { exceptionMiddleware } from "middlewares";
import {
  registerControllersHandler,
  registerLibrariesHandler,
  sessionHandler,
  swaggerHandler,
} from "@main/handlers";
import { logger } from "@config/winston";


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
