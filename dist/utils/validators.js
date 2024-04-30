"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidator = exports.validate = void 0;
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
        return res.status(422).json({ status: "Error", message: errors.array() });
    };
};
exports.validate = validate;
exports.registerValidator = [
    (0, express_validator_1.body)("username").notEmpty().withMessage("Username is required"),
    (0, express_validator_1.body)("email").trim().isEmail().withMessage("Email is Required"),
    (0, express_validator_1.body)("password")
        .trim()
        .isLength({ min: 8, max: 20 })
        .withMessage("Password should contain at least 8 characters and can't be greater than 20 characters"),
];
//# sourceMappingURL=validators.js.map