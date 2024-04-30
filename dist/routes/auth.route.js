"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_js_1 = require("../controllers/auth.controller.js");
const router = express_1.default.Router();
exports.authRouter = router;
router.post("/register", auth_controller_js_1.registerUser);
//# sourceMappingURL=auth.route.js.map