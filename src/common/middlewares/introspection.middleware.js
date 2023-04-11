import axios, { isAxiosError } from "axios";
import { APP_CONFIG } from "../../infrastruture/configs/index.js";
import { RESPONSE_CODE } from "../constants/response-code.const.js";
import { BadGatewayException } from "../exceptions/bad-gateway.exception.js";
import { UnauthorizedException } from "../exceptions/unauthorized.exception.js";
import { Logger } from "../utils/logger.js";
import { asyncRouteHandler } from "./async-route.handler.js";

export function introspectionMiddleware() {
    return asyncRouteHandler(
        /**
         *
         * @param {import("express").Request} req
         * @param {import("express").Response} res
         * @param {import("express").NextFunction} next
         * @return
         */
        async (req, res, next) => {
            const tokenScheme = req.headers.authorization || "";
            const token = tokenScheme.split(" ")[1];

            if (!tokenScheme || !tokenScheme.trim() || !token || !token.trim()) {
                throw new UnauthorizedException("Token is missing or invalid", RESPONSE_CODE.MISSING_TOKEN);
            }

            // call Casdoor userinfo endpoint to check token expiration
            const url = `${APP_CONFIG.authz.baseUrl}${APP_CONFIG.authz.endpoints.userinfo}`;

            try {
                Logger.info("--------- Introspection Middleware - Calling IAM");

                const response = await axios.get(url, { headers: { Authorization: tokenScheme } });

                const data = response.data;

                // token expired
                if (data.status && data.status === "error") {
                    throw new UnauthorizedException("Token is missing or invalid", RESPONSE_CODE.MISSING_TOKEN);
                }

                Logger.info("--------- Introspection Middleware - Passed");

                next();
            } catch (error) {
                if (isAxiosError(error)) {
                    if (error.response) {
                        throw new UnauthorizedException();
                    }

                    Logger.error("--------- Introspection Middleware Error", error.message);
                    throw new BadGatewayException();
                }

                next(error);
            }
        },
    );
}
