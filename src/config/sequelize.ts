import { Product, ProductDeleted, User } from "@modules/data/entities";
import { Sequelize } from "sequelize-typescript";
import { logger } from "./winston";

export const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: "postgres",
  models: [Product, ProductDeleted, User],
  logging:
    process.env["NODE_ENV"] === "dev"
      ? (sql, timing) => {
          logger.info(sql);
        }
      : false,
});
