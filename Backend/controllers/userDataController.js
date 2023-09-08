const User = require("../model/userDataModel");
const userData = require("../model/userDataModel");

const addUser = async (req, res) => {
  const userDetail = req.body;
  try {
    const data = await userData.create({ ...userDetail });
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
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  console.log(req.params.id);
  try {
    const resDlete = await userData.findByIdAndDelete(id);
    console.log(5555, resDlete);
    res.status(204).json({ status: "ok", data: resDlete?._id });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "error", message: err.message });
  }
};
const editUser = async (req, res) => {
  const user = req.body;
  console.log(user._id);
  try {
    await userData.findByIdAndUpdate(user._id, { ...req.body });
    const data = await userData.findById(user._id);
    const { name, email, phone, gender, personId, _id } = data;
    res.status(200).json({
      status: "ok",
      data: { name, email, phone, gender, personId, _id },
    });
  } catch (err) {
    console.log(err.name);
    res.status(400).json({ status: "error", message: err.message });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const data = await userData.find();
    res.status(200).json({
      status: "ok",
      data: data,
    });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

module.exports = { addUser, deleteUser, editUser, getAllUsers };
