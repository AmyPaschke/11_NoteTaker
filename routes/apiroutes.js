const dataBase = require("../db/db.json");

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// const js = require("../public/assets/js/index");

module.exports = function (app) {
  app.get("/api/notes", (req, res) => {
    res.json(dataBase);
  });
};

app.post("/notes", (req, res) => {
  if (dataBase.length) {
    dataBase.push(req.body);
    res.json(true);
  }
});

// const express = require("express");
// const app = express();
// const path = require("path");
// const dataBase = require("../db/notes.js");
// module.exports = function (app) {
//   app.get("/api/notes", (req, res) => {
//     res.json(dataBase);
//   });
// };
// app.post("/notes", (req, res) => {
//   if (dataBase) {
//     dataBase.push(req.body);
//     res.json(true);
//   }
// });
