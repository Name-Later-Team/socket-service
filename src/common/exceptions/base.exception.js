export class BaseException extends Error {
    status;
    code;
    response;
    errors;

    /**
     * @param status HTTP status code
     * @param message Developer readable message
     * @param code Error identifier
     * @param response Response in data field
     */
    constructor(status, message, code, response, errors) {
        super(message);

        this.name = this.constructor.name;
        this.status = status;
        this.code = code;
        this.response = response;
        this.errors = errors;

        Error.captureStackTrace(this, this.constructor);
    }

    toString() {
        const args = [];

        if (this.code !== null && this.code !== undefined) {
            args.push(this.code);
        }

        args.push(this.name, this.message);

        if (this.errors) {
            args.push(this.errors);
        }

        return args.join(" - ");
    }
}
