const express = require('express');
const app = express();
const port = 3000;
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

app.engine("ejs", ejsMate);


//index route
app.get("/home",(req,res)=>{
  res.render("pages/index.ejs")}
);

//root route
app.get('/',(req,res)=>{
  res.send("todo app");
});

app.listen(port,()=>{
  console.log("app is started");
});