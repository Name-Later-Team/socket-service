import { RequestValidationException } from "../exceptions/request-validation.exception.js";

/**
 * To validate request data
 *
 * @param {string} dataPath 'body' | 'query' | 'params' | 'headers'
 * @param {import('joi').ObjectSchema} schema
 * @description Validate request: body | query | params | headers
 */
export function requestValidationMiddleware(dataPath, schema) {
    /**
     * Validate request body
     *
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    return function (req, res, next) {
        const result = schema.validate(req[dataPath]);
        if (result.error) {
            const {
                error: { message, details },
            } = result;
            throw new RequestValidationException(message, details);
        }

        // Attach the validated data into the request and ensures the correction of data types
        req[dataPath] = result.value;
        next();
    };
}
