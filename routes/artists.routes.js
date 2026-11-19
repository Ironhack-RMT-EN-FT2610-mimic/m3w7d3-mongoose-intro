const { Router } = require("express")
const router = Router()

const Artist = require("../models/Artist.model");

router.post("/", (req, res) => {
  console.log(req.body);

  const newArtist = {
    name: req.body.name,
    awardsWon: req.body.awardsWon,
    isTouring: req.body.isTouring,
    genre: req.body.genre,
  };

  Artist.create(newArtist)
    .then((response) => {
      // res.status(201).json(response) // status() will ALWAYS be accompanied by the message
      // res.sendStatus(201) // sendStatus() doesn't need a message
      res.status(201).json({ message: "Artist created" });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.get("/", async (req, res) => {
  console.log(req.query);

  // const response = await Artist.find({isTouring: true})
  const response = await Artist.find(req.query)
    .select({ name: 1, genre: 1 })
    .sort({ name: 1 });

  res.status(200).json(response);

  console.log(error);
  res.json(error);
});

router.delete("/:artistId", async (req, res) => {
  console.log(req.params);
  // (optional) we can first look if the document exists before deleting.

  const response = await Artist.findByIdAndDelete(req.params.artistId);
  console.log(response);
  if (!response) {
    res.status(404).json({ message: "no document was found with that id" });
  } else {
    res.status(202).json({ message: "all good, artist deleted by that id" });
  }

  console.log(error);
  res.json(error);
});

router.patch("/:artistId", async (req, res) => {
  console.log(req.params);
  console.log(req.body);

  const updatedArtist = {
    name: req.body.name,
    awardsWon: req.body.awardsWon,
    isTouring: req.body.isTouring,
    genre: req.body.genre,
  };

  const response = await Artist.findByIdAndUpdate(
    req.params.artistId,
    updatedArtist,
    {
      returnDocument: "after", // give the document back AFTER the modification was done
      runValidators: true, // force the schema validators to run also on update
    },
  );
  res.status(202).json(response);

  console.log(error);
  res.json(error);
});

module.exports = router