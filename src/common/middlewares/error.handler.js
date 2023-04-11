import { BaseException } from "../exceptions/base.exception.js";
import { Logger } from "../utils/logger.js";

/**
 *
 * @param {any} error
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 */
export function errorHandler(error, request, response, next) {
    let status = 500;
    const responseError = {
        code: 500,
        message: "Unknown error occured",
    };

    let outMessage;

    if (error instanceof BaseException) {
        status = error.status;

        responseError.code = error.code;
        responseError.message = error.message;
        responseError.data = error.response;

        outMessage = error.errors && error.toString();
    }

    // handle error detaisl base on its name
    switch (error.name) {
        case "RequestValidationException":
            break;
        default:
            outMessage = exception;
            break;
    }

    // store error logging message
    outMessage && Logger.error(outMessage);

    // Send error response
    response.statusCode = status;
    response.status(status).json(responseError);
}
