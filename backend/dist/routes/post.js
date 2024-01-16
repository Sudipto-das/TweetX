"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("../database");
const middleware_1 = __importDefault(require("../middleware"));
const mongoose_1 = __importDefault(require("mongoose"));
const router = express_1.default.Router();
router.post('/create', middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description } = req.body;
        const userId = req.headers["userId"];
        if (!userId || typeof userId !== 'string') {
            return res.sendStatus(403);
        }
        const newPost = {
            description,
            like: 0,
            created_at: new Date(),
            userId,
            likes: []
        };
        const savePost = yield database_1.Post.create(newPost);
        const populatedPost = yield database_1.Post.findById(savePost._id).populate('userId');
        res.json(populatedPost);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
router.put('/like/:postId', middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.postId;
        const userId = req.headers["userId"];
        if (!userId || typeof userId != 'string') {
            return res.status(403);
        }
        const post = yield database_1.Post.findById(postId);
        if (!post) {
            return res.status(400).json({ message: 'post not find' });
        }
        const hasliked = post === null || post === void 0 ? void 0 : post.likes.some(like => like.toString() === userId);
        if (hasliked) {
            return res.status(400).json({ message: 'user already liked' });
        }
        post.like += 1;
        post.likes.push(new mongoose_1.default.Types.ObjectId(userId));
        yield post.save();
        res.json(post);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
}));
router.put('/follow/:followId', middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const followId = req.params.followId;
        const userId = req.headers["userId"];
        if (!userId || typeof userId != 'string') {
            return res.status(403);
        }
        if (!followId) {
            return res.status(400);
        }
        const followingUser = yield database_1.User.findById(userId);
        const followUser = yield database_1.User.findById(followId);
        if (!followUser) {
            return res.status(400);
        }
        const hasfollowed = followUser.followers.some(follower => follower.toString() === userId);
        if (hasfollowed) {
            return res.status(400).json({ message: "already follow" });
        }
        followUser.followers.push(new mongoose_1.default.Types.ObjectId(userId));
        followingUser === null || followingUser === void 0 ? void 0 : followingUser.following.push(new mongoose_1.default.Types.ObjectId(followId));
        yield followUser.save();
        yield (followingUser === null || followingUser === void 0 ? void 0 : followingUser.save());
        res.json(followUser);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "message": 'internal server error' });
    }
}));
router.get('/users', middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const UserId = req.headers["userId"];
        const users = yield database_1.User.find({ _id: { $ne: UserId } });
        res.json(users);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ massege: 'internal server error' });
    }
}));
router.get('/posts', middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPosts = yield database_1.Post.find({}).populate("userId");
        res.json(allPosts);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
}));
exports.default = router;
