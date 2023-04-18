import { Socket } from "socket.io";
import { Logger } from "../../../common/utils/logger.js";
import { PRESENTATION_NAMESPACE } from "../../common/constants/namespace.const.js";

/**
 * @param {Server} io
 * @param {Socket} socket
 * @description This function registers all basic event for presentation namespace.
 */
export function registerPresentationEvents(io, socket) {
    const eventInfo = { name: "connection", type: "listen", socketId: socket.id };

    Logger.info(PRESENTATION_NAMESPACE, eventInfo);

    socket.on("error", (error) => {
        Logger.error(PRESENTATION_NAMESPACE, { ...eventInfo, name: "error", error });
    });

    socket.on("disconnecting", (reason) => {
        Logger.info(PRESENTATION_NAMESPACE, { ...eventInfo, name: "disconnecting", reason, rooms: socket.rooms });
    });

    socket.on("disconnect", (reason) => {
        Logger.info(PRESENTATION_NAMESPACE, { ...eventInfo, name: "disconnect", reason });
    });

    // join room
    socket.on("join-room", (roomId) => {
        Logger.info(PRESENTATION_NAMESPACE, { ...eventInfo, name: "join-room", roomId });
        // TODO: join-room
    });

    // leave room
    socket.on("leave-room", (roomId) => {
        Logger.info(PRESENTATION_NAMESPACE, { ...eventInfo, name: "leave-room", roomId });
        // TODO: leave-room
    });

    // Register others event here.
    // Notes: Must use a function call and split it into another file
    // ie: registerEditPresention(io, socket);
}
