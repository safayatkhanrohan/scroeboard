const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate");

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    score: {
        type: Number,
        default: 0
    },
    wickets: {
        type: Number,
        default: 0
    },
    overs: {
        type: Number,
        default: 0
    },
    innings: Number
});

teamSchema.plugin(findOrCreate);

const Team = mongoose.model('team', teamSchema);

module.exports = Team;