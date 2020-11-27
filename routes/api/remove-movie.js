const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { checkout, validationResult, check } = require("express-validator");
const User = require("../../model/User");

router.post(
  "/",
  [
    auth,
    check("movieId", "MovieID is required and should be a number!")
      .exists()
      .isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { movieId } = req.body;

    try {
      await User.updateOne(
        { _id: req.user.id },
        { $pull: { preferredMovies: movieId } }
      );
      console.log(movieId);
      res.json({ message: "Movie removed successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
