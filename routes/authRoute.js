const express = require("express");
const router = express.Router();
const {signIn,signUp} = require("../controller/auth.js");

router.post("/signup", signUp);

router.post("/login", signIn);

module.exports=router;