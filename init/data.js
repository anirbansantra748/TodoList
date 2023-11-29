// data.js
const mongoose = require("mongoose");
const TODO = require("./models/todo.js");

async function initializeData() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/MYTODOAPP');

    // Add sample tasks to the database
    const sampleTasks = [
      {
        task: "Complete project",
        date: new Date("2023-12-01"),
        startTime: "09:00 AM",
        endTime: "11:00 AM",
        done: false,
      },
      {
        task: "Study for exams",
        date: new Date("2023-12-02"),
        startTime: "02:00 PM",
        endTime: "04:00 PM",
        done: false,
      },
      // Add more sample tasks as needed
    ];

    await TODO.insertMany(sampleTasks);

    console.log('Data initialization successful.');
  } catch (err) {
    console.error('Error initializing data:', err);
  } finally {
    mongoose.connection.close();
  }
}

module.exports = initializeData;
