"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Chat_js_1 = require("./Chat.js");
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    imgProfile: {
        type: String,
    },
    chats: [Chat_js_1.chatSchema],
});
exports.User = mongoose_1.default.model("Users", userSchema);
//# sourceMappingURL=User.js.map