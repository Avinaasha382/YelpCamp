const express = require("express");
const router = express.Router();
const wrapError = require("../utilities/wrapError");
const {isLoggedIn,isAuthor,validateCampground} = require("../middleware");
const campgrounds = require("../controllers/campgrounds");

router.get("/",campgrounds.index);

router.get("/new",isLoggedIn,campgrounds.renderNewForm);

router.post("/",isLoggedIn,isAuthor,validateCampground,wrapError(campgrounds.createCampground));

router.get("/:id",wrapError(campgrounds.getCampground));

router.get("/:id/edit",isLoggedIn,isAuthor,wrapError(campgrounds.renderUpdateForm));

router.put("/:id",isLoggedIn,isAuthor,validateCampground,wrapError(campgrounds.updateCampground));

router.delete("/:id",isLoggedIn,isAuthor,wrapError(campgrounds.deleteCampground));

module.exports = router;