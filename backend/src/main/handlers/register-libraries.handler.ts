import { Application, ErrorRequestHandler } from "express";
import morgan from "morgan";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import { logger } from "@config/winston";
import { ForbiddenHttpException } from "exceptions/http-exceptions";

const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

export const registerLibrariesHandler = (app: Application) => {
  app.use(morgan("combined", { stream }));
  let corsOptions: CorsOptions = undefined;

  const isProduction = process.env.NODE_ENV === "prod";

  if (isProduction) {
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

    corsOptions = {
      origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(
            new ForbiddenHttpException({ message: "Not allowed by CORS" })
          );
        }
      },
      methods: ["GET", "PUT", "DELETE", "POST"],
    };
  }

  app.use(cors(corsOptions));
  app.use(helmet());
};
