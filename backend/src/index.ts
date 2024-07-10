import express, { Request, Response } from "express";
import { registerControllersHandler } from "./main/handlers/register-controllers.handler";

const app = express();
const port = 3000;

const initializeServer = async () => {
  app.get("/", (req: Request, res: Response) => {
    res.send("Hello, world!");
  });

  await registerControllersHandler(app);

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

initializeServer();
