const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    User: String,
    VIP: { type: Boolean, default: false },
});

module.exports = mongoose.model("store", Schema);