import { createClient } from "redis";
import { APP_CONFIG } from "../configs/index.js";
import { Logger } from "../../common/utils/logger.js";

const clients = {};

let maxRetryCount = 10;

function initRedisConnectionAsync() {
    const url = `redis://${APP_CONFIG.redis.host}:${APP_CONFIG.redis.port}`;
    const redisClient = createClient({ url });

    redisClient.connect();

    clients.redisClient = redisClient;

    redisClient.on("connect", () => Logger.info("Redis connected"));

    redisClient.on("end", () => Logger.info("Redis disconnected"));

    redisClient.on("reconnecting", () => {
        Logger.info("Redis reconnecting");

        maxRetryCount--;
        if (maxRetryCount === 0) {
            process.exit(1);
        }
    });

    redisClient.on("error", (error) => {
        Logger.info("Redis error", error);
    });
}

function getRedisClient() {
    return clients.redisClient;
}

export const RedisClient = {
    initRedisConnectionAsync,
    getRedisClient,
};
