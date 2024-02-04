const UserChat = require("../models/chatSchema");
const mongoose = require("mongoose");

// const createChat = async (req, res) => {
//   try {
//     const objectId = new mongoose.Types.ObjectId();
//     const { user, sender, message } = req.body;
//     const existingChat = await UserChat.findOne({ user, chat_id: objectId });
//     if (existingChat) {
//       existingChat.messages.push({
//         message: {
//           content: message,
//           sender: user,
//           timestamp: Date.now(),
//         },
//       });
//       return res.status(200).json({
//         message: "success",
//         status: 200,
//         data: message,
//       });
//     } else {
//       let newChat;
//       if (message) {
//         newChat = new UserChat({
//           user,
//           sender,
//           chat_id: objectId,
//           messages: [
//             {
//               message: {
//                 content: message,
//                 sender: user,
//                 timestamp: Date.now(),
//               },
//             },
//           ],
//         });
//       } else {
//         newChat = new UserChat({
//           user,
//           sender,
//           chat_id: objectId,
//         });
//       }

//       await newChat.save();
//       return res.status(200).json({
//         message: "Chat created Successfully",
//         status: 200,
//         data: newChat,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

const sendMessage = async (req, res) => {
  try {
    const { user, chatId, message, recive } = req.body;
    if (chatId) {
      const existingChat = await UserChat.findOne({ chat_id: chatId });

      const newMessage = {
        content: message,
        timestamp: Date.now(),
        sender: user,
      };
      if (
        existingChat &&
        existingChat?.messages &&
        existingChat?.messages?.length > 0
      ) {
        existingChat.messages.push({ message: newMessage });
      } else {
        existingChat.messages = [{ message: newMessage }];
      }
      await existingChat.save();

      res.status(200).json({
        message: "Message sent successfully",
        status: 200,
        data: newMessage,
      });
    }
    // else {
    //   newChat = new UserChat({
    //     user,
    //     sender: recive,
    //     chat_id: objectId,
    //     messages: [
    //       {
    //         message: {
    //           content: message,
    //           sender: user,
    //           timestamp: Date.now(),
    //         },
    //       },
    //     ],
    //   });
    //   await newChat.save();
    //   return res.status(200).json({
    //     message: "Message sent successfully",
    //     status: 200,
    //     data: { new_chat_id: newChat._id },
    //   });
    // }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getChats = async (req, res) => {
  try {
    const { sender, user } = req.params;
    const objectId = new mongoose.Types.ObjectId();
    const chat = await UserChat.findOne({
      $or: [
        { sender: sender, user: user },
        { sender: user, user: sender },
      ],
    })
      .populate("user")
      .populate("sender")
      .populate("messages.message.sender");
    if (chat) {
      return res.status(200).json({
        message: `Chat retrive successfully with ${chat.messages.length} messages`,
        data: chat,
        status: 200,
      });
    } else {
      newChat = new UserChat({
        user,
        sender,
        chat_id: objectId,
        messages: [],
      });
      let chat = await newChat.save();
      return res.status(200).json({
        message: `Chat retrive successfully with ${chat.messages.length} messages`,
        status: 200,
        data: chat,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteChats = async (req, res) => {
  try {
    const { chat_id } = req.params;

    const chat = await UserChat.findOne({ chat_id });

    if (!chat) {
      return res.status(404).json({ staus: 404, message: "Chat not found" });
    } else {
      chat.messages = [];
      chat
        .save()
        .then((result, err) => {
          if (result) {
            return res
              .status(200)
              .json({ status: 200, message: "Chat cleared successfully" });
          }
          return res.status(500).json({ staus: 500, message: err.message });
        })
        .catch((err) => {
          return res.status(500).json({ staus: 500, message: err.message });
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

module.exports = { getChats, sendMessage, deleteChats };
