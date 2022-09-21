const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const {MONGO_URI} = require('./config')
const db = require('./database')
const apiSetup = (app) => {
  app.use("/api", require("./api"));
};
const setupMiddleware = (app) => {
  app.use(cors());
  const parser = bodyParser.json();
  const urlEncoded = bodyParser.urlencoded({ extended: false });
  app.use(parser);
  app.use(urlEncoded);
};

const connectToDatabase = () => {
  db.connectToDatabase(MONGO_URI)
};
module.exports = {
  apiSetup,
  setupMiddleware,
  connectToDatabase
};
