const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const validated = await bcrypt.compare(req.body.password, user.password);
    if (user) {
      if (validated) {
        const { password, ...others } = user._doc;
        res.status(200).json(others);
      } else {
        res.status(403).json("Email and password don't match");
      }
    } else {
      res.status(400).json("No user with this email ID");
    }
  } catch (err) {
    res.status(400).json("Please fill all the fields");
  }
});

module.exports = router;
