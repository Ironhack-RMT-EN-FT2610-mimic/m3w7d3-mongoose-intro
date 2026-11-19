const { Schema, model, ObjectId } = require("mongoose")

// schema => what defines the format of the documets
const artistSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  awardsWon: {
    type: Number,
    required: true,
    min: 0,
    max: 1000
  },
  isTouring: {
    type: Boolean,
    required: true,
    default: true
  },
  genre: {
    type: [String],
    required: true,
    enum: ["rock", "pop", "punk", "grunge", "metal"]
  },
  favOtherArtist: {
    type: ObjectId,
    ref: "Artist"
  }
})

// model => tool that allows the server to go to the DB for CRUD
const Artist = model("Artist", artistSchema)

module.exports = Artist