export const HTTP_CODE = {
    ok: 200,
    badRequest: 400,
    created: 201,
    noContent: 204,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    internalServerError: 500,
    badGateway: 502,
};

export const RESPONSE_CODE = {
    // 400: BAD REQUEST
    validationError: 4001,

    // 401: UNAUTHORIZED
    missingToken: 4011,
    invalidSignature: 4013,
    missingRsaAuthHeader: 4014,

    // 403: FORBIDDEN
};
