import { Logger } from "../../../common/utils/logger.js";

/**
 * @param {import("amqplib").ConsumeMessage | null} message
 * @param {string} consumerName
 */
export async function handlePresentationVotingAsync(message, consumerName) {
    Logger.info("-----------------------", consumerName, " consumed -----------------------");

    // handle message here
    // get message and push to socket
    // SocketServer.getInstance().io.of("name space").emit("event", data)
}
