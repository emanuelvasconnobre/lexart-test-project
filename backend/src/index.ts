// .env variables
import dotenv from "dotenv";

// decorators
import "reflect-metadata";

import express, { Request, Response } from "express";
import { registerControllersHandler } from "./main/handlers/register-controllers.handler";
import { registerLibrariesHandler } from "@main/handlers/register-libraries.handler";
import { sequelize } from "@config/sequelize";

const app = express();
const port = process.env["PORT"] || 3000;

app.use(express.json());

const initializeServer = async () => {
  dotenv.config();
  
  await sequelize.sync();

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello, world!");
  });

  await registerControllersHandler(app);
  registerLibrariesHandler(app);

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

initializeServer();
