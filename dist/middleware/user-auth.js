"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isUserAuthenticated(req, res, next) {
    if (req.user)
        next();
    else {
        return res
            .status(200)
            .json({ status: "error", message: "Please Login to continue!" });
    }
}
exports.default = isUserAuthenticated;
