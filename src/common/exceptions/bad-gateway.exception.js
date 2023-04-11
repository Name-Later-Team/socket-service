import statuses from "statuses";
import { HTTP_CODE } from "../constants/response-code.const.js";
import { BaseException } from "./base.exception.js";

export class BadGatewayException extends BaseException {
    constructor(message = statuses(HTTP_CODE.BAD_GATEWAY), code = HTTP_CODE.BAD_GATEWAY) {
        super(HTTP_CODE.BAD_GATEWAY, message, code);
    }
}
