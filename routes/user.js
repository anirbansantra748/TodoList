const express = require("express");
const router = express.Router();
const passport = require("passport");
const localStatergy = require("passport-local");
const User = require("../models/user.js");
const session = require("express-session");


//signup 
router.get("/signup",(req,res)=>{
  res.render("users/signup.ejs");
});

router.post("/signup",async(req,res)=>{
  try{
    const {username,email,password} = req.body;
  let newUser = new User({email,username});
  const registerUser = await User.register(newUser,password);
  res.send(registerUser);
  }catch(err){
    console.log(err);
    res.redirect("/signup");
  }
})

//Login rout 
router.get("/login",(req,res)=>{
  res.render("users/login.ejs");
})

router.post("/login", passport.authenticate("local", {failureRedirect: "/login", successFlash:true}) ,async(req,res)=>{
  res.redirect("/home");
})

module.exports = router;