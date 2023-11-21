const express = require('express');
const app = express();
const port = 3000;


//root rout
app.get('/',(req,res)=>{
  res.send("todo app");
});

app.get("/home",(req,res)=>{
  res.render("pages/index.ejs");
});


app.listen(port,()=>{
  console.log("app is started");
});