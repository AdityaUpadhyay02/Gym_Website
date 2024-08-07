// const express=require('express')
import express from "express"
import cors from "cors"
// const cors=require('cors');
import mongoose from "mongoose"
// const mongoose=require('mongoose');
// const bcryptjs=require('bcryptjs')

const MONGOOSE_URL="mongodb://localhost:27017/gym"
app.use(cors())
app.use(express.json());
mongoose.connect(MONGOOSE_URL)
const db=mongoose.connection;
db.on('error',(err)=>{
    console.error("Mongodb connection error",err)
})
db.once('Open',()=>{
    console.log('Mongodb is connect');
})

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    message:String
})

const User=mongoose.model('User',userSchema)
app.post('/gym',async(req,res)=>{
    try {
        // const hasspassword=await bcryptjs.hashSync(req.body.password,10)
        const newUser=new User({
            name:req.body.name,
            email:req.body.email,
            message:req.body.message,
        });
        const savedUser=await newUser.save()
        res.status(201).json(savedUser)
    } catch (error) {
        console.log('Error during resgisteration',error);
        res.status(500).json({error:"inter server error"})
    }
})








app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});