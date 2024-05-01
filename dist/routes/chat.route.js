"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRouter = void 0;
const express_1 = __importDefault(require("express"));
const verifyToken_js_1 = require("../utils/verifyToken.js");
const validators_js_1 = require("../utils/validators.js");
const chat_controller_js_1 = require("../controllers/chat.controller.js");
const router = express_1.default.Router();
exports.chatRouter = router;
//Private Route
router.post("/new", (0, validators_js_1.validate)(validators_js_1.chatValidator), verifyToken_js_1.verifyToken, chat_controller_js_1.generateChat);
//# sourceMappingURL=chat.route.js.map