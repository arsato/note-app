const express = require("express");
const notes = require("../controllers/notes.controller.js");
const router = express.Router();

router.use(express.json());

router.post("/notes", notes.createNote);
router.get("/notes/archived", notes.findAllArchived);
router.get("/notes/:id", notes.findOneNote);
router.put("/notes/:id", notes.updateNote);
router.delete("/notes/:id", notes.deleteNote);
router.get("/notes/:noteid/tags", notes.findNoteTags);

router.get("/notes", notes.findAllNotesTags);

router.post("/tags", notes.createTag);
router.get("/tags", notes.findAllTags);

router.get("/notes/tags/:tagname", notes.findNotesSpecificTag);

router.get("/relations", notes.findAllRelations);
router.post("/relations", notes.createRelation);
router.delete("/relations/:noteid/:tagid", notes.deleteNoteTag);

module.exports = router;
