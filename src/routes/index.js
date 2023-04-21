import * as express from "express";
import { asyncRouteHandler } from "../common/middlewares/async-route.handler.js";
import { ResponseBuilder } from "../common/utils/builders/response.builder.js";

export const rootRouter = express.Router();

rootRouter.get(
    "/",
    asyncRouteHandler((req, res) => {
        res.json(new ResponseBuilder().withData({ service: "Socket Service", version: "v1" }).build());
    }),
);

export * from "./tickets.js";
