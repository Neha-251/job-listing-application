const mongoose = require("mongoose");


const jobSchema = new mongoose.Schema({
    name: {type: String, required: true},
    logo: {type: String, required: true},
    role: {type: String, required: true},
    ctc: {type: Number, required: true},
    location: {type: String, required: true},
    openings: {type: String, required: true},
    process: {type: String, required: true},
    description: {type: String, required: true},
    experience: {type: String, required: true},
})

const Job = mongoose.model("job", jobSchema);

module.exports = Job;