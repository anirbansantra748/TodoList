
const express = require('express');
const app = express();
const port = 3000;
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const TODO = require("./models/todo.js");
const passport = require("passport");
const localStatergy = require("passport-local");
const User = require("./models/user.js");
const session = require("express-session");

const todoRout = require("./routes/todo.js");
const userRout = require("./routes/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

app.engine("ejs", ejsMate);

const sessionOpt = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie:{
    expires:Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly:true,
  },
};
app.use(session(sessionOpt));

app.use(passport.initialize());//initilize the passport in every call
app.use(passport.session()); //alada page e geleo chine nebe user ke 
passport.use(new localStatergy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//NOTE - Initilise Mongoose here
const mongo_url = 'mongodb://127.0.0.1:27017/MYTODOAPP';

async function main() {
  await mongoose.connect(mongo_url);
}

main()
  .then(() => {
    console.log('Mongoose started');
  })
  .catch((err) => {
    console.log(err);
  });

  //SECTION - we use app.use for all routes
  app.use("/", todoRout);

 //SECTION - Users Routs
 app.use("/",userRout);

app.get("*", (req,res)=>{
  res.render("pages/errorpage.ejs");
});

app.listen(port,()=>{
  console.log("app is started");
}); 