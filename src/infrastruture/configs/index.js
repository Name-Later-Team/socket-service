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
};
