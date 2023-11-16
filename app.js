const express = require('express');
const app = express();
const port = 3000;


//root rout
app.get('/',(req,res)=>{
  res.send("todo app");
});




app.listen(port,()=>{
  console.log("app is started");
});