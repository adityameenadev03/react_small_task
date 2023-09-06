const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./model/userModel");
const axios = require("axios");
const fs = require("fs");

const MongoStore = require("connect-mongo");
const session = require("express-session");

app.use(
  session({
    secret: "fiwafhiwfwhvuwvu9hvvvwv", // Never ever share this secret in production, keep this in separate file on environmental variable
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 86400000 },
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://adityamyuvasoft434:1111@cluster0.jrcq9b4.mongodb.net/?retryWrites=true&w=majority",
    }),
  })
);

const cors = require("cors");

app.use(cors());

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://adityamyuvasoft434:1111@cluster0.jrcq9b4.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(8000, () => {
      console.log("connected to db & listening on port", 8000);
    });
  })
  .catch((err) => {});

app.get("/", (req, res) => {
  res.write("<h1>Hello world</h1>");
  res.send();
});

app.post("/addUser", async (req, res) => {
  const userDetail = req.body;
  try {
    const data = await User.create({ ...userDetail });
    const { name, email, phone, gender, personId, _id } = data;
    console.log(data);
    res.status(200).json({
      status: "ok",
      data: { name, email, phone, gender, personId, _id },
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ status: "error", message: err.message });
  }
});

app.post("/addManyUser", async (req, res) => {
  const userDetail = req.body;
  try {
    const data = await User.insertMany([...userDetail]);
    console.log(data);
    res.status(201).json({
      status: "ok",
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ status: "error", message: err.message });
  }
});

app.get("/getAllUsers", async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json({
      status: "ok",
      data: data,
    });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
});

app.put("/editUser", async (req, res) => {
  const user = req.body;
  console.log(user._id);
  try {
    await User.findByIdAndUpdate(user._id, { ...req.body });
    const data = await User.findById(user._id);
    const { name, email, phone, gender, personId, _id } = data;
    res.status(200).json({
      status: "ok",
      data: { name, email, phone, gender, personId, _id },
    });
  } catch (err) {
    console.log(err.name);
    res.status(400).json({ status: "error", message: err.message });
  }
});

app.delete("/deleteUser/:id", async (req, res) => {
  // const user = req.body;
  const id = req.params.id;
  console.log(req.params.id);
  try {
    const resDlete = await User.findByIdAndDelete(id);
    console.log(5555, resDlete);
    res.status(204).json({ status: "ok", data: resDlete?._id });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "error", message: err.message });
  }
});
