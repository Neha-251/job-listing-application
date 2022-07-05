
const mongoose = require("mongoose");

const connect = mongoose.connect("mongodb+srv://neha:neha@cluster0.hgvdct6.mongodb.net/?retryWrites=true&w=majority")

module.exports = connect;