import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
    email:string;
    username: string;
    password: string;
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
    email:String,
    username: String,
    password: String,
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

const postSchema: Schema<Post> = new mongoose.Schema({
    
    description: String,
    like: Number,
    created_at: Date,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

const User = mongoose.model<User>('User', userSchema);
const Post = mongoose.model<Post>('Post', postSchema);

export { User, Post }