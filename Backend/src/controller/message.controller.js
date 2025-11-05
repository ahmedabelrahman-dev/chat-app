import User from '../models/user.model';
import Message from '../models/message.model.js';
import cloudinary from '../lib/cloudinary.js';

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedonUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedonUserId },
    }).select('-password');
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error('Error fetching users for sidebar:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const getMessages = async (req, res) => {
  try {
    const { id: userTOChatID } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { sender: myId, receiver: userTOChatID },
        { sender: userTOChatID, receiver: myId },
      ],
    }).sort({ createdAt: 1 }); // Sort messages by creation time in ascending order
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverID } = req.params;
    const senderID = req.user._id;

    let imageUrl;
    if (image) {
      // In a real application, you would handle image upload here
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await Message({
      sender: senderID,
      receiver: receiverID,
      text,
      image: imageUrl,
    });
    await newMessage.save();
    // real-time functionality will be handled via socket.io
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
