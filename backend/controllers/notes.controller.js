const db = require("../models");
const Note = db.models.Note;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Title can not be empty!",
    });
    return;
  }

  const note = {
    title: req.body.title,
    content: req.body.content,
    isArchived: false,
  };

  Note.create(note)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Note.",
      });
    });
};

exports.findAll = (req, res) => {
  Note.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes.",
      });
    });
};
