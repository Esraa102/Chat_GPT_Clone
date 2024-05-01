"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOut = exports.getUser = exports.logInUser = exports.registerUser = void 0;
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
                // create access token
                if (newUser) {
                    const accessToken = (0, createToken_js_1.createToken)(newUser);
                    const { password: encyrptedPass, ...rest } = newUser._doc;
                    res
                        .status(201)
                        .cookie(constants_js_1.COOKIE_NAME, accessToken, {
                        path: "/",
                        httpOnly: true,
                        maxAge: 86400000 * 7, // 7 days,
                    })
                        .json({ status: "OK", userData: rest });
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
                // create  access token
                const accessToken = (0, createToken_js_1.createToken)(isAuthorized);
                const { password: encyrptedPass, ...rest } = isAuthorized._doc;
                res
                    .status(200)
                    .cookie(constants_js_1.COOKIE_NAME, accessToken, {
                    path: "/",
                    httpOnly: true,
                    maxAge: 86400000 * 7, // 7 days,
                })
                    .json({ status: "OK", userData: rest });
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
const getUser = async (req, res, next) => {
    if (req.user) {
        return res.status(200).json({ status: "OK", userData: req.user });
    }
    else {
        return res
            .status(500)
            .json({ status: "Error", message: "Something went wrong:(" });
    }
};
exports.getUser = getUser;
const logOut = async (req, res, next) => {
    if (req.user) {
        return res
            .clearCookie(constants_js_1.COOKIE_NAME, {
            httpOnly: true,
            path: "/",
        })
            .status(200)
            .json({ status: "OK", message: "User Logged Out Successfully" });
    }
    else {
        return res.status(401).json({
            status: "Error",
            message: "Your session has been expired, you need to log in first",
        });
    }
};
exports.logOut = logOut;
//# sourceMappingURL=auth.controller.js.map