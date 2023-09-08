const express = require("express");
const requireAuth = require("../middleware/requireAuth");

const {
  addUser,
  deleteUser,
  editUser,
  getAllUsers,
} = require("../controllers/userDataController");

const router = express.Router();

// router.use(requireAuth);

router.get("/getAllUsers", getAllUsers);
router.post("/addUser", addUser);
router.delete("/deleteUser/:id", deleteUser);
router.put("/editUser", editUser);

module.exports = router;
