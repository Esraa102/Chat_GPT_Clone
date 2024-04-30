"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInUser = exports.registerUser = void 0;
const User_js_1 = require("../models/User.js");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createToken_js_1 = require("../utils/createToken.js");
const constants_js_1 = require("../utils/constants.js");
const registerUser = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (username && email && password) {
        try {
            const user = await User_js_1.User.findOne({ email });
            if (user) {
                return res
                    .status(400)
                    .json({ status: "Error", message: "User Is Already Exist" });
            }
            else {
                const hasedPassword = bcrypt_1.default.hashSync(password, 10);
                const newUser = await User_js_1.User.create({
                    username,
                    email,
                    password: hasedPassword,
                });
                // clear previous token
                res.clearCookie(constants_js_1.COOKIE_NAME, {
                    httpOnly: true,
                    signed: true,
                    path: "/",
                });
                // create access token
                if (newUser) {
                    (0, createToken_js_1.createToken)(newUser, res, 201);
                }
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ status: "Error", message: error.message });
        }
    }
    else {
        return res
            .status(400)
            .json({ status: "Error", message: "Please Provide All Fields" });
    }
};
exports.registerUser = registerUser;
const logInUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const isAuthorized = await User_js_1.User.findOne({ email });
        if (!isAuthorized) {
            return res
                .status(401)
                .json({ status: "Error", message: "User Is Unathorized" });
        }
        else {
            if (bcrypt_1.default.compareSync(password, isAuthorized.password.toString())) {
                // clear previous token
                res.clearCookie(constants_js_1.COOKIE_NAME, {
                    httpOnly: true,
                    signed: true,
                    path: "/",
                });
                // create  access token
                (0, createToken_js_1.createToken)(isAuthorized, res, 200);
            }
            else {
                return res
                    .status(400)
                    .json({ status: "Error", message: "Wrong Credentials" });
            }
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: "Error", message: error.message });
    }
};
exports.logInUser = logInUser;
//# sourceMappingURL=auth.controller.js.map