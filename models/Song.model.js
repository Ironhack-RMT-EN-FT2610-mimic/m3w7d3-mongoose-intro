const { Schema, model, ObjectId } = require("mongoose")

const songSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  releasedDate: {
    type: Date,
    required: true,
    default: new Date()
  },
  artist: {
    type: ObjectId,
    ref: "Artist"
  },
  collaboratingArtists: {
    type: [ObjectId],
    ref: "Artist"
  },
})

const Song = model("Song", songSchema)

module.exports = Song