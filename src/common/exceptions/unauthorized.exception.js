import statuses from "statuses";
import { HTTP_CODE } from "../constants/response-code.const.js";
import { BaseException } from "./base.exception.js";

export class UnauthorizedException extends BaseException {
    constructor(message = statuses(HTTP_CODE.unauthorized), code = HTTP_CODE.unauthorized) {
        super(HTTP_CODE.unauthorized, message, code);
    }
}