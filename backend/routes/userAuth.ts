import express from 'express';
import { User } from '../database';
import jwt from 'jsonwebtoken'
import authentication, { secretKey } from '../middleware';
const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { email,username, password } = req.body;
        const user = await User.findOne({ email })
        if (user) {
            return res.status(404).json({ message: "user already registerd" })
        }
        const newUser = new User({ email,username, password })
        await newUser.save()

        const token = jwt.sign({ id: newUser._id }, secretKey, { expiresIn: '10h' })
        res.json({ message: 'signup sucsessfully', token })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }

})
router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: 'user not register' })
        }
        const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: "10h" })
        res.json({ message: 'Logged in successfully', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });

    }
})
router.get('/me',authentication,async(req,res)=>{
    try{
        const user = req.headers['userId']
        res.json(user)
    }catch(error){
        res.status(500).json({message:'internal server error'})
    }
})

export default router;