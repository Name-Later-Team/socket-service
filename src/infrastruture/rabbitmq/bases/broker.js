import * as amqp from "amqplib";
import crypto from "crypto";
import { Logger } from "../../../common/utils/logger.js";

export class RabbitMQBroker {
    /**
     * @type {import("amqplib").Connection}
     */
    connection;

    /**
     * @type {import("amqplib").Channel}
     */
    channel;

    constructor(consumerName) {
        this.name = `Consumer ${consumerName || crypto.randomUUID()}`;
    }

    async initConnectionAsync() {
        this.connection = await amqp.connect("amqp://rabbitmq:rabbitmq1@localhost:5672");
        // this.connection = await amqp.connect(APP_CONFIG.rabbitmq.uri);
        this.channel = await this.connection.createChannel();
    }

    closeConnection() {
        this.connection.close();
        this.channel.close();
    }

    async assertExchange({ name, type }) {
        if (!this.connection) {
            await this.initConnectionAsync();
        }
        await this.channel.assertExchange(name, type, { durable: true });
    }

    /**
     * @param {Object} - object defining queue name and bindingKey
     * @param {Function} handler Handler that will be invoked with given message and acknowledge function (msg, ack)
     */
    async subscribe({ exchange, bindingKey, queueName }, handler) {
        await this.initConnectionAsync();

        Logger.info(this.name, "CONNECTED TO RABBITMQ");

        await this.assertExchange({ name: exchange, type: "topic" });

        Logger.info(this.name, "EXCHANGE ASSERTED");

        await this.channel.assertQueue(queueName, { durable: true, autoDelete: true });

        this.channel.bindQueue(queueName, exchange, bindingKey);

        this.channel.consume(
            queueName,
            async (message) => {
                handler && handler(message, this.name);
            },
            { noAck: true },
        );

        // this.connection.on("error", (err) => {
        //     Logger.error(this.name, "Connection error");
        //     Logger.error(err);

        //     setTimeout(() => this.subscribe({ exchange, bindingKey, queueName }, handler), 1000);
        // });

        this.connection.on("close", (reason) => {
            Logger.error(this.name, "Connection closed");
            Logger.error(reason.message || "Unknown close reason!!!");

            Logger.info(this.name, "Trying to reconnenct");
            setTimeout(() => this.subscribe({ exchange, bindingKey, queueName }, handler), 10000);
        });
    }
}
