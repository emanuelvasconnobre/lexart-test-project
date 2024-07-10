import { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

export const registerLibrariesHandler = (app: Application) => {
  app.use(morgan(process.env["NODE_ENV"] || "dev"));
  app.use(cors());
  app.use(helmet());
};
