import { Logger } from "../../../common/utils/logger.js";
import { SocketServer } from "../../../socket-server/server.js";

/**
 * @param {import("amqplib").ConsumeMessage | null} message
 * @param {string} consumerName
 */
export async function handlePresentationActionAsync(message, consumerName) {
    Logger.info("-----------------------", consumerName, " consumed -----------------------");

    // handle message here
    // SocketServer.getInstance().io.of("name space").emit("event", data)
}
