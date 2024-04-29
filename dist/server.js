"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const connectToDB_js_1 = require("./config/connectToDB.js");
const morgan_1 = __importDefault(require("morgan"));
const auth_route_js_1 = require("./routes/auth.route.js");
const chat_route_js_1 = require("./routes/chat.route.js");
const app = (0, express_1.default)();
const port = process.env.PORT || 5001;
(0, connectToDB_js_1.connectToDB)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
}));
// remove it in the production mode
app.use((0, morgan_1.default)("dev"));
// Routes
app.use("/api/v1/auth", auth_route_js_1.authRouter);
app.use("/api/v1/chats", chat_route_js_1.chatRouter);
app.listen(port, () => {
    console.log(`Server Is Running On ${port}`);
});
//# sourceMappingURL=server.js.map