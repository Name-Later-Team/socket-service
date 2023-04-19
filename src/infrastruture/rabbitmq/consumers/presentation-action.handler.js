import { Logger } from "../../../common/utils/logger.js";
import { SocketServer } from "../../../socket-server/server.js";
import NamespaceRegistry from "../../../socket-server/namespaces/index.js"

/**
 * @param {import("amqplib").ConsumeMessage | null} message
 * @param {string} consumerName
 */
export async function handlePresentationActionAsync(message, consumerName) {
    Logger.info("-----------------------", consumerName, " consumed -----------------------");
    
    try {
        const data = JSON.parse(message.content.toString());

        if(data){
            SocketServer.getInstance().io
            .of(NamespaceRegistry[1].namespace)
            .to(data.roomId)
            .emit(data.eventName, data)
        }
    } catch {
        Logger.error("Error on consume message", consumerName, message.content.toString());
    }
}
