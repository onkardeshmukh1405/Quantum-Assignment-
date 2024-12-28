const User = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authNiddleware");

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(200).send({
        message: "User Already Exists",
        success: false,
      });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newuser = new User(req.body);
    await newuser.save();

    res.status(200).send({
      message: "User creates successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error creating",
      success: false,
      error,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({
        message: "user does not exist",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(200).send({
        message: "Password is incorrect",
        success: false,
      });
    } else {
      const JWT_SECRET = process.env.JWT_SECRET || "dfsjfkdvfxc";

      const token = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: "1d",
      });

      res.status(200).send({
        message: "Login Successful",
        success: true,
        data: token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(200).send({
      message: "Error login ",
      success: false,
      error,
    });
  }
});

router.post("/get-user-info-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "user does not exists",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
        message: "User info fetched successfully",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error getting user info",
      success: false,
      error,
    });
  }
});

router.get("/get-all-users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      message: "Users fetch successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error Applying doctor account",
      success: false,
      error,
    });
  }
});

module.exports = router;
