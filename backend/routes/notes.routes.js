const express = require("express");
const notes = require("../controllers/notes.controller.js");
const router = express.Router();

router.use(express.json());

router.post("/", notes.create);

router.get("/", notes.findAllActive);

router.get("/archived", notes.findAllArchived);

router.put("/:id", notes.update);

router.delete("/:id", notes.delete);

module.exports = router;
