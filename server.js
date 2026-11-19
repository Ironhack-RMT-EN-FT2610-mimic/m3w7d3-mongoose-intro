try {
  process.loadEnvFile();
} catch (error) {
  console.warn("file .env not found. Using default values");
}

const express = require("express");

const app = express();

require("./db")

const addConfig = require("./config")
addConfig(app)

app.get("/", (req, res) => {
  res.status(200).json({ message: "all good here!" });
});

const indexRouter = require("./routes/index.routes.js")
app.use("/api", indexRouter)

const handleErrors = require("./errors")
handleErrors(app)

// server listen & PORT
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
