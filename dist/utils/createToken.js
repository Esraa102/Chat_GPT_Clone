"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (user) => {
    const accessToken = jsonwebtoken_1.default.sign({
        _id: user._id,
        username: user.username,
        email: user.email,
        imgProfile: user.imgProfile,
        chats: user.chats,
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "7d",
    });
    return accessToken;
};
exports.createToken = createToken;
//# sourceMappingURL=createToken.js.map