const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    Guild: { type: String, required: true },
    User: { type: String, required: true },
    Money: { type: Number, default: 0 },
    Bank: { type: Number, default: 0 },
    // RouletteCommands: { type: Number, default: 0 },
});

module.exports = mongoose.model("economy", Schema);