import { Product } from "@data/entities";
import { Sequelize } from "sequelize-typescript";

export const sequelize = new Sequelize({
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: "postgres",
  port: parseInt(process.env.DB_PORT || "6500"),
  models: [Product],
});