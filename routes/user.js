const express = require("express");
const router = express.Router({mergeParams:true});
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/user");

router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.createNewUser));

router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl,passport.authenticate('local',
            {failureRedirect:'/login' , failureFlash:true}),
                userController.loginUser);


router.get("/logout",userController.logoutUser);


module.exports = router;