"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectToDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_CONNECTION_URI);
        console.log("Connected To DB");
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
exports.connectToDB = connectToDB;
//# sourceMappingURL=connectToDB.js.map