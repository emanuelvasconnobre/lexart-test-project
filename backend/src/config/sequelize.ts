import { Product } from "@data/entities";
import { Sequelize } from "sequelize-typescript";

export const sequelize = new Sequelize({
  database: "lexart-db",
  username: "postgres",
  password: "strongpassword",
  host: "localhost",
  dialect: "postgres",
  port: parseInt(process.env.DB_PORT || "6500"),
  models: [Product],
});
