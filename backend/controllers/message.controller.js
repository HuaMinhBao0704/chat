const Conversation = require('../models/conversation.model');
const Message = require('../models/message.model');

// TODO: implement send message feature
async function sendMessage(req, res) {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // console.log({ message, receiverId, senderId });

    // get the conversation of sender and receiver
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId: senderId,
      receiverId: receiverId,
      message: message,
    });

    if (newMessage) {
      conversation['messages'].push(newMessage._id);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log('Error in sendMessage function: ', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Export the functions
module.exports = {
  sendMessage,
};
