import { Socket } from "socket.io";
import { TICKET_CONST } from "../../../common/constants/common.const.js";
import { Logger } from "../../../common/utils/logger.js";
import { RedisClient } from "../../../infrastruture/connections/redis.js";

/**
 *
 * @param {Socket} socket
 * @param {*} next
 */
export async function ticketAuthMiddlewareAsync(socket, next) {
    const authInfo = socket.handshake.auth || {};

    const { identifier, ticket } = authInfo;

    const redisKey = `${TICKET_CONST.redisNamespace}:${identifier}`;

    try {
        const result = await RedisClient.getRedisClient().get(redisKey);
        if (result && result === ticket) {
            next();
        } else {
            next(new Error("invalid_or_expires_ticket"));
        }
    } catch (error) {
        Logger.error("SOCKET AUTHENTICATION", error);
        next(new Error("internal_server_error"));
    }
}
