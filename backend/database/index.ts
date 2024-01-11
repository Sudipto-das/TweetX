import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
    username: string;
    password: string;
    post: mongoose.Types.ObjectId[] | Post[];
    followers: mongoose.Types.ObjectId[];
    following: mongoose.Types.ObjectId[]
}
interface Post extends Document {
    title: string;
    description: string;
    like: number;
    created_at: Date;
    userId: mongoose.Types.ObjectId;
    likes: mongoose.Types.ObjectId[]
}

const userSchema: Schema<User> = new mongoose.Schema({
    username: String,
    password: String,

    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

const postSchema: Schema<Post> = new mongoose.Schema({
    title: String,
    description: String,
    like: Number,
    created_at: Date,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

const User = mongoose.model<User>('user', userSchema);
const Post = mongoose.model<Post>('post', postSchema);

export { User, Post }