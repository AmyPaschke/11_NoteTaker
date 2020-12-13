const dataBase = require("../db/db.json");
const app = express();
const express = require("express");
const path = require("path");

module.exports = function (app) {
  app.get("/api/notes", (req, res) => {
    res.json(dataBase);
  });
};

app.post("/api/notes", (req, res) => {
  if (dataBase.length) {
    dataBase.push(req.body);
  }
});
