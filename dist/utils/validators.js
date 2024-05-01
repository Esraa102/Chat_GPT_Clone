"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatValidator = exports.registerValidator = exports.logInValidator = exports.validate = void 0;
const express_validator_1 = require("express-validator");
const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty()) {
            next();
        }
        else {
            return res.status(422).json({ status: "Error", message: errors.array() });
        }
    };
};
exports.validate = validate;
exports.logInValidator = [
    (0, express_validator_1.body)("email").trim().isEmail().withMessage("Please Enter Valid Email"),
    (0, express_validator_1.body)("password")
        .trim()
        .isLength({ min: 8, max: 20 })
        .withMessage("Password should contain at least 8 characters and can't be greater than 20 characters"),
];
exports.registerValidator = [
    (0, express_validator_1.body)("username").notEmpty().withMessage("Username is required"),
    ...exports.logInValidator,
];
exports.chatValidator = [
    (0, express_validator_1.body)("content")
        .notEmpty()
        .isLength({ min: 2, max: 10000 })
        .withMessage("Message Is Required"),
];
//# sourceMappingURL=validators.js.map