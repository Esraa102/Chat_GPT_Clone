"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.chatSchema = new mongoose_1.default.Schema({
    role: {
        type: String,
        required: true,
        enum: ["user", "system"],
    },
    content: {
        type: String,
        required: true,
    },
});
//# sourceMappingURL=Chat.js.map