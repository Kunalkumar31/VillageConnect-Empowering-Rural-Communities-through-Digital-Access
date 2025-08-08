const ChatMessage = require("../models/ChatMessage");

module.exports = (io) => {
  io.on("connection", async (socket) => {
    console.log(" New user connected");

    // Send last 20 messages to new user
   const { sender, receiver } = socket.handshake.query; // assuming query params or socket data

    const lastMessages = await ChatMessage.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender }
      ]
    })
      .sort({ time: 1 }) // oldest first
      .lean();

    socket.emit("chatHistory", lastMessages);


    // Listen for new messages
    socket.on("sendMessage", async (data) => {
      const message = new ChatMessage({
        user: data.user || "Anonymous",
        text: data.text,
        time: new Date(),
      });

      await message.save();
      io.emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
      console.log(" User disconnected");
    });
  });
};
