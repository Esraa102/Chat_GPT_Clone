"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const User_js_1 = require("../models/User.js");
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerUser = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (username && email && password) {
        try {
            const user = await User_js_1.User.find({ email });
            if (user.length > 0) {
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
                const { password: encyrptedPass, ...rest } = newUser._doc;
                res.status(201).json({ status: "OK", userData: rest });
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
            .json({ status: "Error", message: "Please Provide All Inputs" });
    }
};
exports.registerUser = registerUser;
//# sourceMappingURL=auth.controller.js.map