"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandle = void 0;
const enums_1 = require("../enums");
const ErrorHandle = (err, req, res) => {
    console.error(err.stack);
    res.status(enums_1.ResCode.INTERNAL_SERVER_ERROR).json({ error: "Something went wrong!" });
};
exports.ErrorHandle = ErrorHandle;
