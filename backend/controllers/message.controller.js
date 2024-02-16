const Conversation = require('../models/conversation.model');
const Message = require('../models/message.model');
const { getReceiverSocketId, io } = require('../socket/socket');

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

    // if sender and receiver don't have a conversation yet, create a new one
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // create a new message
    const newMessage = new Message({
      senderId: senderId,
      receiverId: receiverId,
      message: message,
    });

    // if newMessage is not null, add the message to the conversation
    if (newMessage) {
      conversation['messages'].push(newMessage._id);
    }

    // await conversation.save();
    // await newMessage.save();

    // conversation and newMessage are saved in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    // TODO: Socket IO implementation goes here
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // io.to(<socketId) -> send events to a specific client
      io.to(receiverSocketId).emit('new_message', newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log('Error in sendMessage function: ', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// TODO: implement get all messages in conversation feature
async function getAllMessagesInConversation(req, res) {
  try {
    // userToChatId represent for current user (as the receiver)
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    // get the conversation of sender and receiver and get all messages
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate('messages');

    // if conversation is null, return an empty array
    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log(
      'Error in getAllMessagesInConversation function: ',
      error.message
    );
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Export the functions
module.exports = {
  sendMessage,
  getAllMessagesInConversation,
};
