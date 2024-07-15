import { Application } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Lexart Test Backend",
      description: "API Rest developed for Lexart Techynical Test",
      version: "1.0.0",
    },
    servers: [
      {
        url: process.env["URL_BASE"],
        description: "Server",
      },
    ],
  },
  apis: ["**/*.ts"],
};

const specs = swaggerJsdoc(options);

export const swaggerHandler = (app: Application) => {
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));
};
