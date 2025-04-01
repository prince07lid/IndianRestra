
const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const { body, validationResult } = require("express-validator");
const bcrypt=require("bcryptjs");
// Route for creating a user (Signup)
const jwt=require("jsonwebtoken");
const scr="fdabuoibuibauifbuibvbiuadbv";
router.post(
  "/createuser",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt=await bcrypt.genSalt(10);
    let secpass=await bcrypt.hash(req.body.password,salt)
    try {
      await User.create({
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        password: secpass,
      });
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

// Route for user login
router.post(
  "/loginuser",
  [body("email").isEmail(), body("password").notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findOne({ email: req.body.email });
    //   if (!user || user.password !== req.body.password) {
    //     return res.status(401).json({ success: false, error: "Invalid Credentials" });
    //   }
      
      const passwordMatch = await bcrypt.compare(req.body.password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ success: false, error: "Invalid Credentials" });
      }
      const data={
        user:{id:user.id}
      }
      let authtoken=jwt.sign(data,scr);
      res.json({ success: true ,authToken:authtoken});
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

module.exports = router;
