import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/userAuth'
const PORT = 8001
const app = express()
app.use(cors());
app.use(express.json())
app.use('/auth',authRoutes)




app.listen(PORT,()=>{
    console.log(`server running at ${PORT}`)
})
mongoose.connect('mongodb+srv://S_das:Sudipto123@cluster0.c1sttyl.mongodb.net/TweetX', { dbName: "TweetX" })
