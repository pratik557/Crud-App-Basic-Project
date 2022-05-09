const express = require("express");
require("dotenv").config();
const connect_db = require("./connect/connect");
const taskModel = require("./model/tasks");

const app = express();
const PORT = 3000;

console.log(connect_db);

// app.use(express.static('./pulic'))
app.use(express.static(__dirname + "/public"));

//--> app.listen(PORT, () => {
//     console.log("The app is listening at: " + PORT);
// })

app.use(express.json());

app.get("/api/v1/tasks", async (req, res) => {
  try {
    const tasks = await taskModel.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.post("/api/v1/tasks", async (req, res) => {
  try {
    //-->MIDDLEWARE
    // console.log(req.body);
    const createdTask = await taskModel.create(req.body);
    res.status(201).json({ createdTask });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.delete("/api/v1/tasks/:id", async (req, res) => {
  try {
    //MIDDLEWARE
    console.log(req.params);
    const task = await taskModel.findOneAndDelete({ _id: req.params.id });
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.get("/api/v1/tasks/:id", async (req, res) => {
  try {
    //MIDDLEWARE
    console.log(req.params);
    const task = await taskModel.findById(req.params.id);
    if (task) {
      res.status(201).json({ task });
    } else {
      res
        .status(404)
        .json({ message: `Task not found with id: ${req.params.id}` });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.patch("/api/v1/tasks/:id", async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await taskModel.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true, // give the new updated value
      runValidators: true, // if we don't do that the validators which we wrote in model will not run
    });
    if (!task) {
      return res.status(404).json({ message: `No task with id ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("*", (req, res) => {
  res.send("Page Not Found!!!");
});

const start = async () => {
  try {
    await connect_db();
    console.log("Database Connected");
    app.listen(PORT, () => {
      console.log("App is Listening at http://localhost:" + PORT);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
