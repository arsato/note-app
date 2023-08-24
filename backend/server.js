const express = require("express");
require("dotenv").config();
const app = express();
const db = require("./models");
const cors = require("cors");
const routes = require("./routes/notes.routes");
const createNotes = require("./seed/notes.seeds");

app.use(cors());
app.use(express.json());

app.use("/api/notes", routes);

const PORT = process.env.PORT || 3001;

app.use("/", (req, res) => {
  res.json({ message: "Welcome to notes application." });
});

db.sequelize.sync({ force: true }).then(async () => {
  createNotes();
  app.listen(PORT, () => {
    console.log(`Server up in port ${PORT}`);
  });
});


