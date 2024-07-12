import { Application } from "express";
import session from "express-session";
import pgSession from "connect-pg-simple";
import { sequelize } from "@config/sequelize";

export const sessionHandler = (app: Application) => {
  const pgSessionInstance = pgSession(session);

  app.use(
    session({
      store: new pgSessionInstance({
        conObject: {
          ...sequelize.options,
          user: sequelize.options.username,
        },
        createTableIfMissing: true,
        tableName: "session",
      }),
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
};
