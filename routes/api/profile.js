const express = require("express");
const router = express.Router();
const passport = require("passport");

//  Load Profile Model
const Profile = require("../../models/Profile");

//  @route  GET api/profile
//  @desc   Get current user's profile
//  @access Private
router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id })
            .then(profile => {
                res.json(profile);
            })
            .catch(error => {
                console.log(error)
                res.status(404).json(err)
            });
    }
);

//  @route  POST api/profile
//  @desc   Create or edit user profile
//  @access Private
router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id })
            .then(profile => {
                if (profile) {
                    //  Update
                    Profile.findOneAndUpdate(
                        { user: req.user.id },
                        { $set: req.body },
                        { new: true }
                    ).then(profile => res.json(profile));
                } else {
                    //  Create
                    new Profile({ user: req.user.id, ...req.body }).save()
                        .then(profile => res.json(profile));
                }
            });
    }
);

module.exports = router;