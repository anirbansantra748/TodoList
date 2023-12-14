// todo.js

const express = require("express");
const router = express.Router();
const TODO = require("../models/todo.js");

// Index route
router.get("/home", async (req, res) => {
  let tasks = await TODO.find({});
  res.render("pages/index.ejs", { tasks });
});

// Show all tasks route
router.get("/allTasks", async (req, res) => {
  let tasks = await TODO.find({});
  res.render("pages/allTasks.ejs", { tasks });
});

// Serve form for adding a task
router.get("/add", (req, res) => {
  res.render("pages/addForm.ejs");
});

// Serve profile page
router.get("/profile", (req, res) => {
  res.render("pages/profile.ejs");
});

//check
router.get("/check", async(req,res)=>{
  const searchTerm = req.query.search;
  const tasks = await TODO.find({task: { $regex: searchTerm, $options: 'i' }});

  res.render("pages/search.ejs",{tasks,searchTerm});
})
// Save task to the database
router.post("/add", async (req, res) => {
  const { task, date, startTime, endTime } = req.body;
  const newTask = new TODO({
    task,
    date,
    startTime,
    endTime,
  });
  await newTask.save();
  res.redirect("/todo/home");
});

// Render form for editing a task
router.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const currTask = await TODO.findById(id);
  res.render("pages/editTask.ejs", { currTask: currTask });
});

// Update task in the database
router.post("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const { task, date, startTime, endTime } = req.body;
  const currtask = await TODO.findById(id);

  currtask.task = task;
  currtask.date = date;
  currtask.startTime = startTime;
  currtask.endTime = endTime;

  await currtask.save();
  res.redirect("/home");
});

// Delete task from the database
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await TODO.findByIdAndDelete(id);
  res.redirect("/todo/home");
});

// Mark task as done
router.post("/done/:id", async (req, res) => {
  const id = req.params.id;
  const currtask = await TODO.findById(id);
  currtask.done = true;
  await currtask.save();
  res.redirect("/todo/home");
});

module.exports = router;
