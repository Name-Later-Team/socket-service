import crypto from "crypto";
import Joi from "joi";
import { TICKET_CONST } from "../common/constants/common.const.js";
import { HTTP_CODE } from "../common/constants/response-code.const.js";
import { ResponseBuilder } from "../common/utils/builders/response.builder.js";
import RedisClient from "../infrastruture/connections/redis.js";

export const createTicketHeaderSchema = Joi.object({
    "x-request-id": Joi.string().uuid().required().messages({
        "string.base": "Request ID phải là chuỗi",
        "string.empty": "Request ID không được bỏ trống",
        "string.guid": "Request ID phải là uuid",
        "any.required": "Request ID không được bỏ trống",
    }),
    "service-slug": Joi.string().required().messages({
        "string.base": "Service Slug phải là chuỗi",
        "string.empty": "Service Slug không được bỏ trống",
        "any.required": "Service Slug không được bỏ trống",
    }),
}).options({ allowUnknown: true, stripUnknown: false });

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export async function generateAuthenticationTicket(req, res) {
    // generate ticket randomly by using nodejs crypto
    const randomBuffer = crypto.randomBytes(TICKET_CONST.codeLength);
    const ticket = randomBuffer.toString("hex");

    // get indentity information from header
    const requestId = req.header("X-Request-Id");
    const serviceSlug = req.header("Service-Slug") || "";
    const requestIp = req.ip;

    // key will be set as a namespace, ie: "presento:tickets:82d886a9-cb7d-403d-9b9b-57c8d48bbf3e"
    const redisKey = `${serviceSlug}:${TICKET_CONST.redisNamespace}:${requestId}`;

    // save to redis
    // save data with built-in expires mechanism
    await RedisClient.getRedisClient().setEx(redisKey, TICKET_CONST.timeToLive, JSON.stringify({ ticket, requestIp }));

    res.status(HTTP_CODE.created).json(new ResponseBuilder().withCode(HTTP_CODE.created).withData({ ticket }).build());
}
