"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const entities_1 = require("@modules/data/entities");
const sequelize_typescript_1 = require("sequelize-typescript");
const winston_1 = require("./winston");
exports.sequelize = new sequelize_typescript_1.Sequelize(process.env.POSTGRES_URL, {
    dialect: "postgres",
    models: [entities_1.Product, entities_1.ProductDeleted, entities_1.User],
    logging: process.env["NODE_ENV"] === "dev"
        ? (sql, timing) => {
            winston_1.logger.info(sql);
        }
        : false,
});
