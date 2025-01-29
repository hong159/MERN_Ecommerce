"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResCode = void 0;
var ResCode;
(function (ResCode) {
    ResCode[ResCode["OK"] = 200] = "OK";
    ResCode[ResCode["CREATED"] = 201] = "CREATED";
    ResCode[ResCode["NO_CONTENT"] = 204] = "NO_CONTENT";
    ResCode[ResCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    ResCode[ResCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    ResCode[ResCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    ResCode[ResCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    ResCode[ResCode["METHOD_NOT_ALLOWED"] = 405] = "METHOD_NOT_ALLOWED";
    ResCode[ResCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    ResCode[ResCode["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
})(ResCode || (exports.ResCode = ResCode = {}));
