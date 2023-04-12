import statuses from "statuses";
import { HTTP_CODE } from "../constants/response-code.const.js";
import { BaseException } from "./base.exception.js";

export class BadGatewayException extends BaseException {
    constructor(message = statuses(HTTP_CODE.badGateway), code = HTTP_CODE.badGateway) {
        super(HTTP_CODE.badGateway, message, code);
    }
}
