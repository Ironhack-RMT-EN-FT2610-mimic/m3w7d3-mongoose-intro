const { Router } = require("express")
const router = Router()

const Song = require("../models/Song.model");

router.post("/", async (req, res) => {
  const newSong = {
    title: req.body.title,
    releasedDate: req.body.releasedDate,
    artist: req.body.artist,
    collaboratingArtists: req.body.collaboratingArtists,
  };

  await Song.create(newSong);
  res.status(201).json({ message: "Song created" });
  console.log(error);
  res.json(error);
});

router.get("/", async (req, res, next) => {
  const response = await Song.find()
    .select("-releasedDate")
    // .populate("artist", "-genre")
    .populate({
      path: "artist",
      select: { gente: 0 },
      populate: { path: "favOtherArtist", select: { name: 1 } },
    })
    .populate("collaboratingArtists", "name");

  //* old legacy way
  // const response = await Song.find().select("title artist").populate({
  //   path: "artist",
  //   select: { name: 1 }
  // })

  res.status(200).json(response);
});

module.exports = router