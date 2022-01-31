const router = require("express").Router();
// const savedNotes = require("../../db/db.json");
const fs = require("fs");
const { nanoid } = require("nanoid");

let savedNotes;

router.get("/notes", (req, res) => {
  //   let results = savedNotes;
  savedNotes = JSON.parse(fs.readFileSync("db/db.json"));
  console.log("got new note");
  res.json(savedNotes);
});

router.get("/db", (req, res) => {
  console.log("database");
  res.json(savedNotes);
});

router.post("/notes", (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = { id: nanoid(), title, text };
    res.send("done");
    savedNotes.push(newNote);

    fs.writeFile("db/db.json", JSON.stringify(savedNotes), (err) =>
      err ? console.error(err) : console.log("note written")
    );

    res.json(savedNotes);
  }
});

router.delete("/notes/:id", (req, res) => {
  const id = req.params.id;
  let delNote = savedNotes.filter((curNote) => {
    return curNote.id != id;
  });

  fs.writeFileSync("db/db.json", JSON.stringify(delNote));
  res.json(delNote);
});

module.exports = router;
