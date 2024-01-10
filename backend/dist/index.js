"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const userAuth_1 = __importDefault(require("./routes/userAuth"));
const PORT = 8001;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/auth', userAuth_1.default);
app.listen(PORT, () => {
    console.log(`server running at ${PORT}`);
});
mongoose_1.default.connect('mongodb+srv://S_das:Sudipto123@cluster0.c1sttyl.mongodb.net/TweetX', { dbName: "TweetX" });
