const express = require('express');
const app = express();
const port = 3000;

//make the full setup required for the views to show after then dm me i will work.

//root route
app.get('/',(req,res)=>{
  res.send("todo app");
});

//index route
app.get('/index',(req,res)=>{
  res.render('index.ejs');
});


app.listen(port,()=>{
  console.log("app is started");
});