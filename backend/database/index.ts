import mongoose, { Schema ,Document} from "mongoose";

interface User extends Document {
    username:string;
    password:string;
    post:mongoose.Schema.Types.ObjectId[] | Post[];
    followers:mongoose.Schema.Types.ObjectId[] | User[];
    following:mongoose.Schema.Types.ObjectId[] | User[]
}
interface Post extends Document {
    title:string;
    description:string;
    like:number;
    created_at:Date
}

const userSchema :Schema<User>= new mongoose.Schema({
    username:String,
    password:String,
    post:[{type:mongoose.Schema.Types.ObjectId,ref:"Post"}],
    followers:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    following:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}]
})

const postSchema :Schema<Post> = new mongoose.Schema({
    title:String,
    description:String,
    like:Number,
    created_at:Date,
})

const User = mongoose.model<User>('user',userSchema);
const Post = mongoose.model<Post>('post',postSchema);

export {User,Post}