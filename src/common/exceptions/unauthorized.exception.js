import statuses from "statuses";
import { HTTP_CODE } from "../constants/response-code.const.js";
import { BaseException } from "./base.exception.js";

export class UnauthorizedException extends BaseException {
    constructor(message = statuses(HTTP_CODE.UNAUTHORIZED), code = HTTP_CODE.UNAUTHORIZED) {
        super(HTTP_CODE.UNAUTHORIZED, message, code);
    }
}