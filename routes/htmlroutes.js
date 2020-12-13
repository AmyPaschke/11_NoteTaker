// Require 'path' package to get file path for our html
const express = require("express");
const path = require("path");

module.exports = function (app) {
  app.use(express.static(path.join(__dirname, "../public")));

  app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
