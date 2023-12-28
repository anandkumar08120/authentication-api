const express=require('express');
const app=express();
const mongoose=require('mongoose');
const env=require('dotenv');
env.config();
const PORT=3000;
const cors = require('cors');
app.use(cors());
app.use(express.json());
const authRoute=require('./routes/authRoute');

app.use("/",authRoute);

app.listen(PORT,()=>{
    console.log('connected to server')
})


mongoose.connect(process.env.URL)
.then(()=>{
    console.log('connected to database')
}).catch((e)=>{
    console.log(e)
})