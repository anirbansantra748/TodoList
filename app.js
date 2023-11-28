const express = require('express');
const app = express();
const port = 3000;
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const TODO = require("./models/todo.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

app.engine("ejs", ejsMate);

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

//NOTE - add task post route for save in database
app.post("/add",async(req,res)=>{
  const {task, duration} = req.body;
   const newTask = new TODO({
    task,
    duration,
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
  const {task,duration} = req.body;
  const currtask = await TODO.findById(id);

  currtask.task = task;
  currtask.duration = duration;

  await currtask.save();
  res.redirect("/home");
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await TODO.findByIdAndDelete(id);
  res.redirect("/home");
});

//root route
app.get('/',(req,res)=>{
  res.send("todo app");
});

app.listen(port,()=>{
  console.log("app is started");
});