"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: String,
    password: String,
    post: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Post" }],
    followers: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }]
});
const postSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    like: Number,
    created_at: Date,
});
const User = mongoose_1.default.model('user', userSchema);
exports.User = User;
const Post = mongoose_1.default.model('post', postSchema);
exports.Post = Post;
