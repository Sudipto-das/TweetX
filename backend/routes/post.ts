
import express from 'express';
import { Post,User } from '../database';
import jwt from 'jsonwebtoken'
import { secretKey } from '../middleware';
import authentication from '../middleware';
import mongoose, { ObjectId } from 'mongoose';
const router = express.Router();

interface NewPost {
    title: string;
    description: string;
    like: number;
    created_at: Date;
    userId: string;
    likes:ObjectId[]
}


router.post('/create', authentication, async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.headers["userId"]

        if (!userId || typeof userId !== 'string') {
            return res.sendStatus(403);
        }
        const newPost: NewPost = {
            title,
            description,
            like: 0,
            created_at: new Date(),
            userId,
            likes:[]
            
            
        }
        const savePost = await Post.create(newPost)
        res.json(savePost)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
router.put('/like/:postId',authentication,async (req,res)=>{
    try{
        const postId = req.params.postId
        const userId= req.headers["userId"] 
        if(!userId || typeof userId!='string'){
            return res.status(403)
        }
        const post = await Post.findById(postId)
        if(!post){
            return res.status(400).json({message:'post not find'})
        }
        const hasliked = post?.likes.some(like => like.toString() === userId)
        if(hasliked){
            return res.status(400).json({message:'user already liked'})
        }
        post.like+=1;
        post.likes.push(new mongoose.Types.ObjectId(userId));
        await post.save()
        res.json(post)
    }catch(error){
        console.log(error)
        res.status(500).json({message:'internal server error'})
    }
})
router.put('/follow/:followId',authentication,async (req,res)=>{

    try{
        const followId= req.params.followId;
        const userId = req.headers["userId"]
        
        if(!userId || typeof userId!='string'){
            return res.status(403)
        }
        if(!followId){
            return res.status(400)
        }
        const followingUser = await User.findById(userId)
        const followUser = await User.findById(followId)
        if(!followUser){
            return res.status(400)
        }
        const hasfollowed = followUser.followers.some(follower=> follower.toString() === userId)
        if(hasfollowed){
            return res.status(400).json({message:"already follow"})
        }
        followUser.followers.push(new mongoose.Types.ObjectId(userId))
        followingUser?.following.push(new mongoose.Types.ObjectId(followId))
        await followUser.save();
        await followingUser?.save()
        res.json(followUser)
    }catch(error){
        console.log(error)
        res.status(500).json({"message":'internal server error'})
    }
})
router.get('/posts',authentication,async (req,res)=>{
    try{
        const allPosts = await Post.find({})
        res.json(allPosts)
    }catch(error){
        console.log(error)
        res.status(500).json({message:'internal server error'})
    }
})
export default router;
