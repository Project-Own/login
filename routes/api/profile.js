const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../model/User");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findOne(
      { _id: req.user.id },
      { _id: 0, name: 1, email: 1, avatar: 1, preferredMovies: 1 }
    );
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.get("/preferred-movies", auth, async (req, res) => {
  try {
    const movieList = await User.findOne(
      { _id: req.user.id },
      { _id: 0, preferredMovies: 1 }
    );
    res.json(movieList);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
