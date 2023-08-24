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

exports.findAllActive = (req, res) => {
  Note.findAll({ where: { isArchived: false } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes.",
      });
    });
};

exports.findAllArchived = (req, res) => {
  Note.findAll({ where: { isArchived: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Note.update(req.body, {
    where: { noteId: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Note with id=${id}. Maybe the Note was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Note with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Note.destroy({
    where: { noteId: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Note was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Note with id=${id}. Maybe the Note was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Note with id=" + id,
      });
    });
};
