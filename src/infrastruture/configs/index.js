import * as dotenv from "dotenv";
dotenv.config();

export const APP_CONFIG = {
    appEnvironment: process.env.APP_ENV || "development",
    appProtocol: process.env.PROTOCOL || "http",
    appHost: process.env.HOST || "localhost",
    appPort: process.env.PORT ? +process.env.PORT : 5001,
    logLevel: process.env.LOG_LEVEL || "debug",
    logDriver: process.env.LOG_DRIVER || "console",
    powerBy: process.env.POWER_BY || "",

    origin: process.env.ORIGIN.split(" ") || "*",
    credential: Boolean(process.env.CREDENTIAL).valueOf(),

    socket: {
        cors: {
            origin: process.env.SOCKET_ORIGIN.split(" ") || "*",
            credential: Boolean(process.env.SOCKET_CREDENTIAL).valueOf(),
        },
    },

    authz: {
        baseUrl: process.env.AUTHZ_URL,
        endpoints: {
            userinfo: process.env.AUTHZ_ENDPOINT_USERINFO,
        },
    },

    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT ? +process.env.REDIS_PORT : 6378,
    },

    rabbitmq: {
        uri: process.env.RABBITMQ_URI || "",
        exchange: {
            name: process.env.RABBITMQ_EXCHANGE_NAME || "",
        },

        queues: {
            actionQueue: process.env.RABBITMQ_PRESENTATION_ACTION_QUEUE || "",
            votingQueue: process.env.RABBITMQ_PRESENTATION_VOTING_QUEUE || "",
        },

        topics: {
            actionTopic: process.env.RABBITMQ_PRESENTATION_ACTION_TOPIC || "",
            votingTopic: process.env.RABBITMQ_PRESENTATION_VOTING_TOPIC || "",
        },
    },
};

export const SERVICE_CONFIG_FACTORY = {
    presenti: {
        clientId: process.env.PRESENTI_CLIENT_ID,
        rsaPublicKey: process.env.PRESENTI_PUBLIC_KEY,
    },
    presento: {
        clientId: process.env.PRESENTO_CLIENT_ID,
        rsaPublicKey: process.env.PRESENTO_PUBLIC_KEY,
    },
};
