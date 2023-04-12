import express from "express";
import { asyncRouteHandler } from "../common/middlewares/async-route.handler.js";
import { introspectionMiddleware } from "../common/middlewares/introspection.middleware.js";
import { requestValidationMiddleware } from "../common/middlewares/request-validation.middleware.js";
import { rsaValidationMiddleware } from "../common/middlewares/rsa-validation.middleware.js";
import { createTicketHeaderSchema, generateAuthenticationTicketAsync } from "../controllers/tickets.controller.js";

export const router = express.Router();

router.post(
    "/tickets",
    introspectionMiddleware(),
    requestValidationMiddleware("headers", createTicketHeaderSchema),
    asyncRouteHandler(generateAuthenticationTicketAsync),
);

router.post(
    "/audience/tickets",
    rsaValidationMiddleware(),
    requestValidationMiddleware("headers", createTicketHeaderSchema),
    asyncRouteHandler(generateAuthenticationTicketAsync),
);
