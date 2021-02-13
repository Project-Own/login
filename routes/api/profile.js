const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../model/User");
const MongoClient = require("mongodb").MongoClient;

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
  const db = client.db("Movie");
});

const uri =
  "mongodb+srv://nirjal123:nirjal123@cluster0.6jptv.mongodb.net/Movie?retryWrites=true&w=majority";
const findMovie = async (list) => {
  let allValues;
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).catch((err) => console.log(err));

  if (!client) {
    return;
  }

  try {
    const db = client.db("Movie");
    const MongoClient = require("mongodb").MosngoClient;

    const collection = db.collection("Movie");

    let cursor = collection.find({ index: { $in: list } });

    // for await (const doc of cursor) {
    //   console.log(doc);
    // }
    allValues = await cursor.toArray();

    // console.log(allValues);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
  return allValues;
};

router.get("/preferred_movies", auth, async (req, res) => {
  try {
    const movieList = await User.findOne(
      { _id: req.user.id },
      { _id: 0, preferredMovies: 1 }
    );
    let movie = await findMovie(movieList.preferredMovies);
    res.json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
