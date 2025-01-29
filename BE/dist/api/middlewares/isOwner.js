"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOwner = void 0;
const enums_1 = require("../enums");
const lodash_1 = require("lodash");
const isOwner = async (req, res, next) => {
    try {
        const { id } = req.params;
        const currentUserId = (0, lodash_1.get)(req, "user._id");
        if (!id) {
            console.log("Resource ID not provided");
            res.status(enums_1.ResCode.BAD_REQUEST).json({ message: "Bad Request: Resource ID not provided" });
            return;
        }
        if (!currentUserId) {
            console.log("User ID not found in request");
            res.status(enums_1.ResCode.FORBIDDEN).json({ message: "Forbidden: User ID not found" });
            return;
        }
        if (currentUserId.toString() !== id) {
            console.log(`User ${currentUserId} is not the owner of resource ${id}`);
            res
                .status(enums_1.ResCode.FORBIDDEN)
                .json({ message: "Forbidden: You are not the owner of this resource" });
            return;
        }
        console.log(`User ${currentUserId} is the owner of resource ${id}`);
        (0, lodash_1.merge)(req, { user: currentUserId });
        next();
    }
    catch (error) {
        console.error("Error on isOwner: ", error);
        next(error);
    }
};
exports.isOwner = isOwner;
