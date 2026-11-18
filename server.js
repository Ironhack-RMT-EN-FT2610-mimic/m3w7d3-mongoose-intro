try {
  process.loadEnvFile()
} catch(error) {
  console.warn("file .env not found. Using default values")
}

const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const app = express();

const mongoose = require("mongoose")
const MONGO_URI = "mongodb://localhost:27017/artists-db"

mongoose.connect(MONGO_URI)
.then((response) => {
  console.log("all good, connected to the DB")
})
.catch((error) => {
  console.log(error)
})

// all middlewares & configurations here
app.use(logger("dev"));
app.use(express.static("public"));

// to allow CORS access from anywhere
app.use(cors({
  origin: '*'
}));

// below two configurations will help express routes at correctly receiving data. 
app.use(express.json()); // recognize an incoming Request Object as a JSON Object
app.use(express.urlencoded({ extended: false })); // recognize an incoming Request Object as a string or array

const Artist = require("./models/Artist.model")

// all routes here...
app.get("/", (req, res) => {
  res.json({ message: "all good here!" })
})

app.get("/test/:userId", (req, res) => {
  console.log(req.body)
  console.log(req.params)
  console.log(req.query)
  res.json({ message: "accessing the /test route" })
})

app.post("/artists", (req, res) => {

  console.log(req.body)

  const newArtist = {
    name: req.body.name,
    awardsWon: req.body.awardsWon,
    isTouring: req.body.isTouring,
    genre: req.body.genre,
  }

  Artist.create(newArtist)
  .then(() => {
    res.send("all good, artist created")
  })
  .catch((err) => {
    console.log(err)
    res.json(err)
  })

})

app.get("/artists", async(req, res) => {
  console.log(req.query)
  try {
    
    // const response = await Artist.find({isTouring: true})
    const response = await Artist.find(req.query).select({name: 1, genre: 1}).sort({name: 1})

    res.json(response)

  } catch (error) {
    console.log(error)
    res.json(error)
  }

})

app.delete("/artists/:artistId", async(req,res) => {
  console.log(req.params)
  try {

    // (optional) we can first look if the document exists before deleting.
    
    const response = await Artist.findByIdAndDelete(req.params.artistId)
    console.log(response)
    if (!response) {
      res.send("no document was found with that id")
    } else {
      res.send("all good, artist deleted by that id")
    }

  } catch (error) {
    console.log(error)
    res.json(error)
  }

})

app.patch("/artists/:artistId", async(req, res) => {

  console.log(req.params)
  console.log(req.body)

  const updatedArtist = {
    name: req.body.name,
    awardsWon: req.body.awardsWon,
    isTouring: req.body.isTouring,
    genre: req.body.genre
  }

  try {
    
    const response = await Artist.findByIdAndUpdate(req.params.artistId, updatedArtist, {
      returnDocument: "after", // give the document back AFTER the modification was done
      runValidators: true // force the schema validators to run also on update
    })
    res.json(response)

  } catch (error) {
    console.log(error)
    res.json(error)
  }

})

// server listen & PORT
const PORT = process.env.PORT || 5005

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
