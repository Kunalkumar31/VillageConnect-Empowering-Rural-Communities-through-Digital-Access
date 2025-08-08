const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema({
    user: {
        type: String,
        default: "Anonymous",
    },
    text: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        default: () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

});

module.exports = mongoose.model("ChatMessage", chatMessageSchema);
