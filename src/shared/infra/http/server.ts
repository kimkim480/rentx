import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import "@shared/container";

import { AppError } from "@shared/errors/AppError";
import { router } from "@shared/infra/http/routes";
import connect from "@shared/infra/typeorm";

import swaggerFile from "../../../swagger.json";

connect();

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
      status: "Error",
      message: `Internal Server Error - ${err.message}`,
    });
  }
);

app.listen(3333, () => {
  console.log(
    "Server is running on port 3333.\nCheck it out on http://localhost:3333"
  );
});