const { Router } = require("express");
const router = Router();
const isAuthenticated = require("../authenticatons/jwt.authentication");

const {
  getPublishedAdverts,
  createAdvert,
  deleteAdvert,
  getAdvert,
  updateAdvert,
  getAdvertsByUser,
  getManagerAdverts
} = require("../controllers/adverts.controlles");

router.route("/")
    .get(getPublishedAdverts)
    .post(isAuthenticated, createAdvert);

router.route("/:id")
  .get(getAdvertsByUser)
  .delete(isAuthenticated, deleteAdvert);

router.route("/editar/:id") 
    .put(updateAdvert)
    .get(isAuthenticated, getAdvert);

router.route( "/allAdverts")
    .get(isAuthenticated, getManagerAdverts)

module.exports = router;
