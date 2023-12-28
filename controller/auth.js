const mongoose = require("mongoose");
const env=require('dotenv');
env.config();
const User=require('../model/userModel')
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt')




const signIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username : username });
    if (!existingUser) {
      return res.status(400).json({ message: "user not found!!" });
    }
    const hashedPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!hashedPassword) {
      return res.status(400).json({ message: "wrond password" });
    }
    const token = await jwt.sign(
      { username : username },
      process.env.SECRET_KEY
    );
    res.status(200).json({ message: "sucessfully logged in" });
  } catch (e) {
    return res.status(400).json(e);
  }
};


const signUp=async(req,res)=>{
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
          return res
            .status(400)
            .json({ message: "User with this username already exists" });
        }
    
    
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({
          username: username,
          password: hash,
        });
        const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY);
        
        return res.status(200).json({ message: "Account created successfully " });
      } catch (e) {
        return res.status(400).json(e);
      }
}


module.exports={signIn,signUp};