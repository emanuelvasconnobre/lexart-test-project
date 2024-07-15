import { Application } from "express";
import session from "express-session";
import pgSession from "connect-pg-simple";
import { sequelize } from "@modules/config/sequelize";

export const sessionHandler = (app: Application) => {
  const pgSessionInstance = pgSession(session);

  const isProduction = process.env.NODE_ENV === "prod";
  let cookiesConfig: session.CookieOptions;

  if (isProduction) {
    cookiesConfig = {
      domain: "*",
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      httpOnly: true,
      sameSite: "none",
    };
  } else {
    cookiesConfig = {
      maxAge: 24 * 60 * 60 * 1000,
      secure: false,
      httpOnly: true,
      sameSite: "strict",
    };
  }

  app.use(
    session({
      store: new pgSessionInstance({
        conObject: {
          ...sequelize.options,
          connectionString: process.env.POSTGRES_URL,
        },
        createTableIfMissing: true,
        tableName: "session",
      }),
      secret: process.env["SECRET"] || "secret",
      resave: false,
      saveUninitialized: false,
      cookie: cookiesConfig,
    })
  );
};
