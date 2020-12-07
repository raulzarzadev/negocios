const { Router } = require("express");
const isAuthenticated = require("../authenticatons/jwt.authentication");
const router = Router();
const {
  getUser,
  deleteUser,
  updateUser,
  createUser,
  confirmEmail,
  getCredit,
  addCredit,
  signIn,
  forgotPassword,
  recoverPassword
} = require("../controllers/users.controller");

router.route("/:id").get(getUser);

router.route("/signup").post(createUser);

router.route("/signup/:token").post(confirmEmail);

router.route("/signin").post(signIn);

router.route("/addCredit").get(getCredit).post(isAuthenticated, addCredit);

router
  .route("/:id")
  .delete(isAuthenticated, deleteUser)
  .put(isAuthenticated, updateUser);

router.route("/forgot-password").post(forgotPassword)

router.route("/recover-password/:token").post(recoverPassword)

module.exports = router;
