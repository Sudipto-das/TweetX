import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const PORT = 3000
const app = express()
app.use(cors());
app.use(express.json())




app.listen('PORT',()=>{
    console.log(`server running at ${PORT}`)
})