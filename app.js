const express = require('express');
const app = express();
const port = 3000;
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

app.engine("ejs", ejsMate);

//NOTE - Initilise Mongoose here
const mongo_url = 'mongodb://127.0.0.1:27017/TODOAPP';

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
app.get("/home",(req,res)=>{
  res.render("pages/index.ejs")}
);

//NOTE - add task get rout to serve form
app.get("/add",(req,res)=>{
  res.render("pages/addForm.ejs");
});
//NOTE - add task post route for save in databace
app.post("/add",(req,res)=>{
  let task = req.body.task;
  let duration = req.body.duration;
  let date = req.body.date;
  console.log(task);
  res.send(task +" ki maki chut. Land kare aise task");
})
//root route
app.get('/',(req,res)=>{
  res.send("todo app");
});

app.listen(port,()=>{
  console.log("app is started");
});