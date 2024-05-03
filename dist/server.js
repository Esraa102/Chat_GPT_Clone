"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const connectToDB_js_1 = require("./config/connectToDB.js");
const auth_route_js_1 = require("./routes/auth.route.js");
const chat_route_js_1 = require("./routes/chat.route.js");
const app = (0, express_1.default)();
const port = process.env.PORT || 5001;
const dirname = path_1.default.resolve();
console.log(dirname);
(0, connectToDB_js_1.connectToDB)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)(process.env.ACCESS_TOKEN_SECRET));
app.use((0, cors_1.default)({
    origin: "https://chat-gpt-clone-q8ib.onrender.com",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
}));
app.use(express_1.default.static(path_1.default.join(dirname, "/dist/frontend")));
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(dirname, "frontend", "dist", "index.html"));
});
// Routess
app.use("/api/v1/auth", auth_route_js_1.authRouter);
app.use("/api/v1/chats", chat_route_js_1.chatRouter);
app.listen(port, () => {
    console.log(`Server Is Running On ${port}`);
});
//# sourceMappingURL=server.js.map