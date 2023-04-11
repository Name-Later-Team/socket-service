import { HTTP_CODE, RESPONSE_CODE } from "../constants/response-code.const.js";
import { BaseException } from "./base.exception.js";

export class RequestValidationException extends BaseException {
    /**
     *
     * @param message Client readable message
     * @param errorDetails Validation error object description
     */
    constructor(message, errorDetails) {
        super(HTTP_CODE.BAD_REQUEST, "Validation error", RESPONSE_CODE.VALIDATION_ERROR, {
            error: message,
            errorDetails,
        });
    }
}
