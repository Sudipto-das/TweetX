import express from 'express';
import { User } from '../database';
import jwt from 'jsonwebtoken'

const router  = express.Router();
const secretKey = "helloworld"
router.post('/signup',async (req,res)=>{
    try{
        const {username , password} = req.body;
        const user = await User.findOne({username})
        if(user){
            return res.status(404).json({message:"user already registerd"})
        }
        const newUser = new User ({username , password})
        await newUser.save()

        const token = jwt.sign({username},secretKey,{expiresIn:'10h'})
    } catch (error){
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    
})
router.post('/login',async (req,res)=>{

    try{
        const {username , password} =req.body;
        const user = await User.findOne({username})
        if(!user){
            return res.status(404).json({message:'user not register'})
        }
        const token = jwt.sign({username},secretKey,{expiresIn:"10h"})
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

export default router;