"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_js_1 = require("../controllers/auth.controller.js");
const validators_js_1 = require("../utils/validators.js");
const verifyToken_js_1 = require("../utils/verifyToken.js");
const router = express_1.default.Router();
exports.authRouter = router;
router.post("/register", (0, validators_js_1.validate)(validators_js_1.registerValidator), auth_controller_js_1.registerUser);
router.post("/login", (0, validators_js_1.validate)(validators_js_1.logInValidator), auth_controller_js_1.logInUser);
router.get("/auth-status", verifyToken_js_1.verifyToken, auth_controller_js_1.getUser);
router.get("/logout", verifyToken_js_1.verifyToken, auth_controller_js_1.logOut);
//# sourceMappingURL=auth.route.js.map