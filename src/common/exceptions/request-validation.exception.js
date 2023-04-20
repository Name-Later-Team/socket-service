import { HTTP_CODE, RESPONSE_CODE } from "../constants/response-code.const.js";
import { BaseException } from "./base.exception.js";

export class RequestValidationException extends BaseException {
    /**
     *
     * @param message Client readable message
     * @param errorDetails Validation error object description
     */
    constructor(message, errorDetails) {
        super(HTTP_CODE.badRequest, "Validation error", RESPONSE_CODE.validationError, {
            error: message,
            errorDetails,
        });
    }
}
