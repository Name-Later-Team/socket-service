import { RsaValidator } from "@huyleminh/nodejs-sdk";
import moment from "moment";
import { SERVICE_CONFIG_FACTORY } from "../../infrastruture/configs/index.js";
import { RESPONSE_CODE } from "../constants/response-code.const.js";
import { UnauthorizedException } from "../exceptions/unauthorized.exception.js";
import { Logger } from "../utils/logger.js";
import { asyncRouteHandler } from "./async-route.handler.js";
import url from "url";

export function rsaValidationMiddleware() {
    return asyncRouteHandler(
        /**
         *
         * @param {import("express").Request} req
         * @param {import("express").Response} res
         * @param {import("express").NextFunction} next
         * @return
         */
        async (req, res, next) => {
            Logger.info("--------- RSA Authentication - Starting");

            // Get request header information
            const requestTime = req.header("Request-Time");
            const clientId = req.header("Client-Id");
            const xAuthorization = req.header("Signature");
            const resourceUri = req.header("Resource-Uri");
            const httpMethod = req.method;
            const serviceSlug = req.header("Service-Slug");

            Logger.info(`Validate for service - ${serviceSlug} - ${clientId}`);

            // Check request time format
            const timeToCheck = moment(requestTime, "YYYY-MM-DDTHH:mm:ssZ", true);
            if (!timeToCheck.isValid()) {
                throw new UnauthorizedException("Request time format is incorrect", RESPONSE_CODE.missingRsaAuthHeader);
            }

            // validate client-id
            const config = SERVICE_CONFIG_FACTORY[serviceSlug];
            if (!config || clientId !== config.clientId) {
                throw new UnauthorizedException(
                    "Service slug or client id is incorrect",
                    RESPONSE_CODE.missingRsaAuthHeader,
                );
            }

            const rootUrl = url.parse(req.originalUrl);

            // Check whethe resource uri match req.path or not
            if (resourceUri !== rootUrl.pathname) {
                throw new UnauthorizedException(
                    "Request resource uri and path are incompatible",
                    RESPONSE_CODE.missingRsaAuthHeader,
                );
            }

            // req.body is a raw Buffer -> must be converted to string
            const payload = req.text ?? "";

            const verifySetting = {
                publicKey: config.rsaPublicKey,
                payload,
                headers: { requestTime, httpMethod, clientId, resourceUri, xAuthorization },
            };

            const validator = new RsaValidator(verifySetting);
            if (!validator.verifySignature()) {
                throw new UnauthorizedException("Invalid signature", RESPONSE_CODE.invalidSignature);
            }

            Logger.info("--------- RSA Authentication Completed");
            next();
        },
    );
}
