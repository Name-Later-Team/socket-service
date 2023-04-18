import { Socket } from "socket.io";
import { TICKET_CONST } from "../../../common/constants/common.const.js";
import { Logger } from "../../../common/utils/logger.js";
import { RedisClient } from "../../../infrastruture/connections/redis.js";

/**
 *
 * @param {Socket} socket
 * @param {*} next
 */
export async function ticketAuthMiddlewareAsync(namespace, socket, next) {
    const eventInfo = { name: "handshake", type: "listen", socketId: socket.id };
    Logger.info(namespace, "SOCKET AUTHENTICATION", eventInfo);

    // const authInfo = socket.handshake.auth || {};

    // const { identifier, ticket } = authInfo;

    // const redisKey = `${TICKET_CONST.redisNamespace}:${identifier}`;

    // try {
    //     const result = await RedisClient.getRedisClient().get(redisKey);
    //     if (result && result === ticket) {
    //         Logger.info(namespace, "SOCKET AUTHENTICATION - Passed");
    //         next();
    //     } else {
    //         Logger.info(namespace, "SOCKET AUTHENTICATION - Failed");
    //         next(new Error("invalid_or_expires_ticket"));
    //     }
    // } catch (error) {
    //     Logger.error("SOCKET AUTHENTICATION - Error", error);
    //     next(new Error("internal_server_error"));
    // }
    next();
}
