const express = require("express");
const app = express();
const cors = require("cors");
const jobController = require("./controllers/job.controller")

app.use(express.json());
app.use(cors());

app.use("/jobs", jobController)



module.exports = app;