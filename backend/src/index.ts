// .env variables
import dotenv from "dotenv";
dotenv.config();

// decorators
import "reflect-metadata";

import express, { Request, Response } from "express";
import { registerControllersHandler } from "./main/handlers/register-controllers.handler";
import { registerLibrariesHandler } from "@main/handlers/register-libraries.handler";
import { sequelize } from "@config/sequelize";
import { exceptionMiddleware } from "middlewares";
import session from "express-session";

const app = express();
const port = process.env["PORT"] || 3000;

app.use(express.json());

const initializeServer = async () => {
  await sequelize.sync();

  app.use(
    session({
      secret: process.env["SECRET"] || "secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        secure: false,
        httpOnly: true,
        sameSite: "strict",
      },
    })
  );

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello, world!");
  });

  await registerControllersHandler(app);
  registerLibrariesHandler(app);

  app.use(exceptionMiddleware);

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

initializeServer();
