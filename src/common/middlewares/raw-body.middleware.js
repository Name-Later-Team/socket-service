/**
 * @description This middleware handles parsing body data into text string and json body payload.
 * - This midd must be placed before rsaValidationMiddleware
 * - Only process when content-type = 'application/json+text'
 */
export function rawBodyMiddleware(req, res, next) {
    const headerContentType = req.headers["content-type"];
    if (!headerContentType || !headerContentType.includes("application/json+text")) {
        next();
        return;
    }

    const rawPayload = req.body;

    req.text = rawPayload.toString();
    req.body = JSON.parse(rawPayload);

    next();
}
