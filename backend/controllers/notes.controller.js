const { Op } = require('sequelize')
const Sequelize = require("sequelize");
const db = require("../models");
const Note = db.models.Note;
const Tag = db.models.Tag;
const NoteTag = db.models.NoteTag;

exports.createNote = (req, res) => {
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

exports.createTag = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Name can not be empty!",
    });
    return;
  }

  const tag = {
    name: req.body.name,
  };

  Tag.create(tag)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Note.",
      });
    });
};

exports.createRelation = (req, res) => {
  const notetag = {
    noteNoteId: req.body.noteId,
    tagTagId: req.body.tagId
  };

  NoteTag.create(notetag)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Note.",
      });
    });
};

exports.findOneNote = (req, res) => {
  const id = req.params.id;
  Note.findOne({ where: { noteId: id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes.",
      });
    });
};

exports.findOneTag = (req, res) => {
  const id = req.params.id;
  Tag.findOne({ where: { tagId: id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes.",
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

exports.updateNote = (req, res) => {
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

exports.deleteNote = (req, res) => {
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

exports.deleteTag = (req, res) => {
  const id = req.params.id;

  Tag.destroy({
    where: { tagId: id },
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

exports.deleteTagWithNoRelation = (req, res) => {
  Tag.destroy({
    where: {
      tagId: {
        [Op.not] : [
          Sequelize.literal('SELECT "tagTagId" from "notetags"')
    ],
  }}})
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
        message: err.message || "Some error occurred while cleaning tags.",
      });
    });
};

exports.findAllTags = (req, res) => {
  Tag.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes.",
      });
    });
};

exports.findAllRelations = (req, res) => {
  NoteTag.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes.",
      });
    });
};

exports.deleteNoteTag = (req, res) => {
  const {noteid, tagid} = req.params;
  NoteTag.destroy({ where: { noteNoteId: noteid, tagTagId: tagid } })

  .then((num) => {
    if (num == 1) {
      res.send({
        message: "Tag was deleted successfully!",
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

exports.findNotesSpecificTag = (req, res) => {
  const tag = req.params.tagname;
  Tag.findAll({
    where: {
      name: tag,
    },
    include: [
      {
        model: Note,
        required: false,
        through: { attributes: [] },
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes.",
      });
    });
};

exports.findAllNotesTags = (req, res) => {
  Note.findAll({
    include: [
      {
        model: Tag,
        required: false,
        through: { attributes: [] },
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes.",
      });
    });
};

exports.findNoteTags = (req, res) => {
  const id = req.params.noteid;
  Note.findAll({
    where: {
      noteId: id,
    },
    include: [
      {
        model: Tag,
        required: false,
        through: { attributes: [] },
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving note tags.",
      });
    });
};
