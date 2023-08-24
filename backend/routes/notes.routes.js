const express = require("express");
const notes = require("../controllers/notes.controller.js");
const router = express.Router();

router.use(express.json());

router.post("/", notes.create);

router.get("/", notes.findAll);

module.exports = router;
