import { Product, ProductDeleted, User } from "@data/entities";
import { Sequelize } from "sequelize-typescript";
import { logger } from "./winston";

export const sequelize = new Sequelize({
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: "postgres",
  port: parseInt(process.env.DB_PORT || "6500"),
  models: [Product, ProductDeleted, User],
  logging:
    process.env["NODE_ENV"] === "dev"
      ? (sql, timing) => {
          logger.info(sql);
        }
      : false,
});
