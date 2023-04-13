import { Server } from "socket.io";
import { APP_CONFIG } from "../infrastruture/configs/index.js";
import { ticketAuthMiddlewareAsync } from "./common/middlewares/ticket-auth.middleware.js";
import NamespaceRegistry from "./namespaces/index.js";

export class SocketServer {
    io;
    static #instance;

    // to prevent public constructor
    static #isContructable = false;

    constructor(httpServer) {
        if (!SocketServer.#isContructable) {
            throw new TypeError("SocketServer is not constructable");
        }

        if (!httpServer) {
            throw new Error("invalid http.Server instance");
        }

        this.io = new Server(httpServer, {
            serveClient: false,
            pingInterval: 10000,
            pingTimeout: 5000,
            cookie: false,
            cors: {
                credentials: APP_CONFIG.socket.cors.credential,
                origin: APP_CONFIG.socket.cors.origin,
            },
        });

        this.#registerEvents();
    }

    /**
     * @description Get instance to init socket connection event:
     * - ie: SocketServer.getInstance().io.on("event", listener)
     * @returns SocketServer instance
     */
    static getInstance(httpServer) {
        if (!SocketServer.#instance) {
            SocketServer.#isContructable = true;
            SocketServer.#instance = new SocketServer(httpServer);
            SocketServer.#isContructable = false;
        }
        return SocketServer.#instance;
    }

    #registerEvents() {
        this.io.use(ticketAuthMiddlewareAsync);

        NamespaceRegistry.forEach((namespace) => {
            this.io.of(namespace.namespace).on("connection", (socket) => namespace.handler(this.io, socket));
        });
    }
}
