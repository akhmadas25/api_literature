const express = require("express");

const router = express.Router();

const { uploadFile } = require("../middlewares/uploadFile");
const { auth, admin } = require("../middlewares/auth");

// Controller
const {
  register,
  login,
  checkAuth,
  resetPassword,
  sendResetPassword,
} = require("../controllers/auth");
const {
  addLiteratur,
  getLiteratur,
  getLiteraturs,
  getMyLiteratur,
  changeStatus,
  searchLiteraturs,
  editLiteratur,
} = require("../controllers/literatur");
const {
  addCollection,
  getCollection,
  getDetailCollection,
  deleteCollection,
} = require("../controllers/collection");
const { updateProfile, getProfile } = require("../controllers/user");
// Get addUser controller user here ...

// Route
router.post("/login", login);
router.post("/register", register);
router.patch("/changeProfile", auth, uploadFile("picture"), updateProfile);
router.get("/checkAuth", auth, checkAuth);

router.post("/addLiteratur", auth, uploadFile("attach"), addLiteratur);
router.get("/literatur/:id", auth, getLiteratur);
router.get("/literaturs", getLiteraturs);
router.post("/literaturs/search", auth, searchLiteraturs);
router.patch("/literatur/:id", auth, admin, changeStatus);
router.post("/literatur/:id", auth, uploadFile("attach"), editLiteratur);
router.post("/addCollection", auth, addCollection);
router.get("/collection", auth, getCollection);
router.get("/collection/:id", auth, getDetailCollection);
router.delete("/collection/:id", auth, deleteCollection);
router.get("/profile", auth, getProfile);
router.get("/profile/literatur", auth, getMyLiteratur);
router.post("/reset-password", sendResetPassword);
router.patch("/reset-password/:id/:token", resetPassword);
module.exports = router;
