const { Router } = require("express")
const router = Router()


// all routes here...
router.get("/test/:userId", (req, res) => {
  console.log(req.body);
  console.log(req.params);
  console.log(req.query);
  res.status(200).json({ message: "accessing the /test route" });
});

const artistsRouter = require("./artists.routes")
router.use("/artists", artistsRouter)

const songsRouter = require("./songs.routes")
router.use("/songs", songsRouter)



module.exports = router