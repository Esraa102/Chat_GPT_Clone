"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (user, res, statusCode) => {
    const accessToken = jsonwebtoken_1.default.sign({
        _id: user._id,
        username: user.username,
        email: user.email,
        password: user.password,
        chats: user.chats,
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "7d",
    });
    const { password: encyrptedPass, ...rest } = user._doc;
    return res
        .status(Number(statusCode))
        .cookie("access_token", accessToken, {
        httpOnly: true,
        maxAge: 86400000 * 7, // 7 days,
    })
        .json({ status: "OK", userData: rest });
};
exports.createToken = createToken;
//# sourceMappingURL=createToken.js.map