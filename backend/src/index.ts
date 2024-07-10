import dotenv from "dotenv";

import express, { Request, Response } from "express";
import { registerControllersHandler } from "./main/handlers/register-controllers.handler";
import { registerLibrariesHandler } from "@main/handlers/register-libraries.handler";

const app = express();
const port = process.env["PORT"] || 3000;

dotenv.config();

app.use(express.json());

const initializeServer = async () => {
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
