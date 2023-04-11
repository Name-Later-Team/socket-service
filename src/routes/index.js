import * as express from "express";
import { asyncRouteHandler } from "../common/middlewares/async-route.handler.js";
import { ResponseBuilder } from "../common/utils/builders/response.builder.js";
import { RequestValidationException } from "../common/exceptions/request-validation.exception.js";

export const router = express.Router();

router.get(
    "/",
    asyncRouteHandler((req, res) => {
        res.json(new ResponseBuilder().withData({ service: "Socket Service", version: "v1" }).build());
    }),
);

router.get(
    "/test",
    asyncRouteHandler((req, res) => {
        throw new RequestValidationException("test validation", "error details");
    }),
);
