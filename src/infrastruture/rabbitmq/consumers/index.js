import { Logger } from "../../../common/utils/logger.js";
import { APP_CONFIG } from "../../configs/index.js";
import { RabbitMQBroker } from "../bases/broker.js";
import { handlePresentationActionAsync } from "./presentation-action.handler.js";
import { handlePresentationVotingAsync } from "./presentation-voting.handler.js";

const ConsumerRegistry = [
    {
        exchange: APP_CONFIG.rabbitmq.exchange.name,
        bindingKey: APP_CONFIG.rabbitmq.topics.actionTopic,
        queueName: APP_CONFIG.rabbitmq.queues.actionQueue,
        handler: handlePresentationActionAsync,
    },
    {
        exchange: APP_CONFIG.rabbitmq.exchange.name,
        bindingKey: APP_CONFIG.rabbitmq.topics.votingTopic,
        queueName: APP_CONFIG.rabbitmq.queues.votingQueue,
        handler: handlePresentationVotingAsync,
    },
];

export async function registerSocketConsumers() {
    ConsumerRegistry.forEach(({ exchange, bindingKey, queueName, handler }, index) => {
        const brokerConsumer = new RabbitMQBroker(`${queueName} ${index + 1}`);

        brokerConsumer.subscribe({ exchange, bindingKey, queueName }, handler).catch((error) => {
            Logger.error("REGISTER CONSUMERS ERRORS", `${queueName} ${index + 1}`, error.message || error);
        });
    });
}
