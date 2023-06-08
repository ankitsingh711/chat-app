const express = require("express");
const UserRouter = express.Router();
const { UserModel } = require("../model/UserModel");
const bcrypt = require("bcrypt");
const verifyEmail = require("../config/nodemailer");
const { Authentication } = require("../middlewares/Authentication");
const jwt = require("jsonwebtoken");
require("dotenv").config();

var usermail = "";
UserRouter.get("/verify", async (req, res) => {
  try {
    let user = await UserModel.updateOne(
      { email: usermail },
      { $set: { isVerified: true } }
    );
    console.log(user);
    res.status(201).json({
      msg: "Email Verified",
    });
  } catch (error) {
    console.log(error);
  }
});
UserRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    bcrypt.hash(password, 10, async (err, hashPass) => {
      if (err) {
        res.status(401).json({
          msg: "Error while Register !",
        });
      } else {
        const User = new UserModel({ username, email, password: hashPass });
        await User.save();
        verifyEmail(email);
        usermail = email;
        res.status(201).json({
          msg: "User Registered",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

UserRouter.post("/login", Authentication, async (req, res) => {
  const payload = req.body;
  try {
    const User = await UserModel.findOne({ email: payload.email });
    if (User.isVerified === true) {
      jwt.sign(User.email, process.env.secretKey, (err, token) => {
        if (err) {
          console.log(err);
        } else {
          res.status(201).json({
            msg: "Login Success",
            token: token,
          });
        }
      });
    } else {
      res.status(401).json({
        msg: "Not a Verified User",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = { UserRouter };
