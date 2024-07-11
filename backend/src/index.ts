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
} from "@main/handlers";

const app = express();
const port = process.env["PORT"] || 3000;

app.use(express.json());

const initializeServer = async () => {
  await sequelize.sync();

  // Handlers
  sessionHandler(app);
  await registerControllersHandler(app);
  registerLibrariesHandler(app);

  // Middlewares
  app.use(exceptionMiddleware);

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

initializeServer();
