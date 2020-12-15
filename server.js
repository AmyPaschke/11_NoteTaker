const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

let notesArray = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));

app.get("/api/notes", function (err, res) {
  try {
    notesArray = fs.readFileSync("./db/db.json", "utf8");
    console.log("Processing request");
    notesArray = JSON.parse(notesArray);
  } catch (error) {
    console.log("There was an error with this process.");
    console.log(error);
  }
  res.json(notesArray);
});

// we use this function to write a "note" like with writing a new file in previous examples
app.post("/api/notes", function (req, res) {
  try {
    notesArray = fs.readFileSync("./db/db.json", "utf8");
    console.log(notesArray);
    notesArray = JSON.parse(notesArray);
    req.body.id = notesArray.length;
    notesArray.push(req.body);
    notesArray = JSON.stringify(notesArray); //we have to stringify the array so the page can read it
    fs.writeFile("./db/db.json", notesArray, "utf8", function (error) {
      if (error) throw error;
    });
    res.json(JSON.parse(notesArray));
  } catch (error) {
    throw error;
  }
});

//function for deleting an entered note aside from the test note
app.delete("/api/notes/:id", function (req, res) {
  try {
    notesArray = fs.readFileSync("./db/db.json", "utf8");
    notesArray = JSON.parse(notesArray);
    notesArray = notesArray.filter(function (note) {
      return note.id != req.params.id;
    });
    notesArray = JSON.stringify(notesArray);
    fs.writeFile("./db/db.json", notesArray, "utf8", function (err) {
      if (err) throw err;
    });
    res.send(JSON.parse(notesArray));
  } catch (error) {
    throw error;
  }
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/api/notes", function (req, res) {
  return res.sendFile(path.json(__dirname, "/db/db.json"));
});

app.listen(PORT, function () {
  console.log("SERVER IS LISTENING: " + PORT);
});
