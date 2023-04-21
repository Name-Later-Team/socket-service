import { Logger } from "../../../common/utils/logger.js";
import NamespaceRegistry from "../../../socket-server/namespaces/index.js";
import { SocketServer } from "../../../socket-server/server.js";

/**
 * @param {import("amqplib").ConsumeMessage | null} message
 * @param {string} consumerName
 */
export async function handlePresentationActionAsync(message, consumerName) {
    Logger.info("-----------------------", consumerName, " consumed -----------------------");

    try {
        if (!message) {
            throw new Error("Consumed a null message");
        }

        const { content } = message;

        const data = JSON.parse(content.toString());

        if (!data) {
            Logger.info("Received data with invalid format. Cannot process socket function");
            return;
        }

        const socketInstance = SocketServer.getInstance();
        const presentationNamespace = NamespaceRegistry[1].namespace;

        socketInstance.io.of(presentationNamespace).to(data.roomId).emit(data.eventName, data.payload);

        Logger.info("Push message to socket client ok");
    } catch (error) {
        Logger.error("-----------------------", consumerName, " Error -----------------------");
        Logger.error(error);
    }
}
