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


//index route
app.get("/home",async (req,res)=>{
  let tasks = await TODO.find({});
  res.render("pages/index.ejs", {tasks})}
);

//show all tasks route
app.get("/allTasks",async (req,res)=>{
  let tasks = await TODO.find({});
  res.render("pages/allTasks.ejs", {tasks})}
);


//NOTE - add task get route to serve form
app.get("/add",(req,res)=>{
  res.render("pages/addForm.ejs");
});
//NOTE - add task get route to serve form
app.get("/profile",(req,res)=>{
  res.render("pages/profile.ejs");
});

//NOTE - add task post route for save in database
app.post("/add",async(req,res)=>{
  const {task, date, startTime, endTime} = req.body;
   const newTask = new TODO({
    task,
    date,
    startTime,
    endTime,
   });
  await newTask.save();
  res.redirect("/home");
});

//NOTE - edit route form render
app.get("/edit/:id",async(req,res)=>{
  const id = req.params.id;
  const currTask = await TODO.findById(id);
  res.render("pages/editTask.ejs",{currTask:currTask});
})

//post route or edit route
app.post("/edit/:id", async (req,res)=>{
  const id = req.params.id;
  const {task, date, startTime, endTime} = req.body;
  const currtask = await TODO.findById(id);

  currtask.task = task;
  currtask.date = date;
  currtask.startTime = startTime;
  currtask.endTime = endTime;

  await currtask.save();
  res.redirect("/home");
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await TODO.findByIdAndDelete(id);
  res.redirect("/home");
});

//done task
app.post("/done/:id",async (req,res)=>{
  const id = req.params.id;
  const currtask = await TODO.findById(id);
  currtask.done = true;
  await currtask.save();
  res.redirect("/home");
});

//SECTION - Users Routs
//signup 
app.get("/signup",(req,res)=>{
  res.render("users/signup.ejs");
});

app.post("/signup",async(req,res)=>{
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
app.get("/login",(req,res)=>{
  res.render("users/login.ejs");
})

app.post("/login", passport.authenticate("local", {failureRedirect: "/login", successFlash:true}) ,async(req,res)=>{
  res.redirect("/home");
})


//root route
app.get('/demo', async(req,res)=>{
  let fakeuser =  new User({
    email:"op@gmail.com",
    username:"Anirban Santra",
  });
  let regUser = await User.register(fakeuser,"ANIRBAN1234");
  res.send(regUser);
});

app.get("*", (req,res)=>{
  res.render("pages/errorpage.ejs");
});

app.listen(port,()=>{
  console.log("app is started");
}); 