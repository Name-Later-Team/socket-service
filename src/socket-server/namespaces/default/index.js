import { Server, Socket } from "socket.io";
import { Logger } from "../../../common/utils/logger.js";
import { DEFAULT_NAMESPACE } from "../../common/constants/namespace.const.js";

/**
 * @param {Server} io
 * @param {Socket} socket
 * @description This function registers all basic event for default namespace.
 */
export function registerDefaultEvents(io, socket) {
    const eventInfo = { name: "connection", type: "listen", socketId: socket.id };

    Logger.info(DEFAULT_NAMESPACE, eventInfo);

    socket.on("error", (error) => {
        Logger.error(DEFAULT_NAMESPACE, { ...eventInfo, name: "error", error });
    });

    socket.on("disconnecting", (reason) => {
        Logger.info(DEFAULT_NAMESPACE, { ...eventInfo, name: "disconnecting", reason, rooms: socket.rooms });
    });

    socket.on("disconnect", (reason) => {
        Logger.info(DEFAULT_NAMESPACE, { ...eventInfo, name: "disconnect", reason });
    });

    // Register others event here.
    // Notes: Must use a function call and split it into another file
    // ie: registerEditPresention(io, socket);
}
