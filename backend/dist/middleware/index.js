"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.secretKey = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.secretKey = "helloworld";
const authentication = (req, res, next) => {
    const authHeaders = req.headers.authorization;
    if (authHeaders) {
        const token = authHeaders.split(' ')[1];
        if (token) {
            jsonwebtoken_1.default.verify(token, exports.secretKey, (err, payload) => {
                if (err) {
                    return res.sendStatus(401);
                }
                if (!payload) {
                    return res.sendStatus(403);
                }
                if (typeof payload === "string") {
                    return res.sendStatus(403);
                }
                req.headers['userId'] = payload.id;
                next();
            });
        }
        else {
            res.sendStatus(401);
        }
    }
    else {
        res.sendStatus(401);
    }
};
exports.default = authentication;
