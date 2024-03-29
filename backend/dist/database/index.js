"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: String,
    username: String,
    password: String,
    followers: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }]
});
const postSchema = new mongoose_1.default.Schema({
    description: String,
    like: Number,
    created_at: Date,
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    likes: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }]
});
const User = mongoose_1.default.model('User', userSchema);
exports.User = User;
const Post = mongoose_1.default.model('Post', postSchema);
exports.Post = Post;
