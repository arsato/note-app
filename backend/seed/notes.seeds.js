const db = require("../models");
const Note = db.models.Note;

const createNotes = async () => {
  await Note.create({
    title: "Note 1",
    content: "Content 1",
  });
  await Note.create({
    title: "Note 2",
    content: "Content 2",
  });
  await Note.create({
    title: "Note 3",
    content: "Content 3",
    isArchived: true,
  });
  await Note.create({
    title: "Note 4",
    content: "Content 4",
  });

  await Note.create({
    title: "Note 5",
    content: "Content 5",
    isArchived: true,
  });

  await Note.create({
    title: "Note 6",
    content: "Content 6",
  });
};

module.exports = createNotes;
