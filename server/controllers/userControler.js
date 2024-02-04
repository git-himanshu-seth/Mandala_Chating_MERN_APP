const userModel = require("../models/userModel");
const Friendship = require("../models/friendSchema");
const FriendRequest = require("../models/friendRequestSchema");
const mongoose = require("mongoose");
// user normal login need to add login in firebase account also.
const signup = async (req, res) => {
  const { googleId, email, name } = req.body;
  let userExist = await userModel.findOne({ email: email });
  if (userExist) {
    return res.status(200).json({
      message: "Email already exists",
      status: 200,
    });
  } else {
    userModel
      .create({ name: name, googleId: googleId, email })
      .then((result) => {
        Friendship.create({ user_id: result._id, friends: [] });
        res.status(200).json({
          message: "User created successfully",
          data: result,
          status: 200,
        });
      })
      .catch((err) => {
        if (err.name === "ValidationError") {
          console.error("Validation Error:", err.message);
          res
            .status(400)
            .json({ message: "Validation Error", error: err.message });
        } else {
          console.error("Error creating user:", err);
          res
            .status(500)
            .json({ message: "Internal Server Error", error: err.message });
        }
      });
  }
};

const signin = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  userModel
    .findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "User signed in successfully",
        data: user,
        status: 200,
      });
    })
    .catch((err) => {
      console.error("Error signing in user:", err);

      res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message });
    });
};

// login user with google remaining
// normal login remaining

const getFriendList = (req, res) => {
  const userId = req?.params?.id;
  Friendship.findOne({ user_id: userId })
    .populate("friends.user", "name email")
    .then((list) => {
      if (list) {
        res.status(200).json({
          message:
            list.friends.length > 0
              ? "Get friends list successfully"
              : "No friends were found",
          success: true,
          data: list.friends,
          length: list.friends.length,
          status: 200,
        });
      } else {
        res.status(404).json({
          message: "No data found",
          success: false,
          status: 404,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
        success: false,
        status: 500,
      });
    });
};
const getUserByGoogleId = async (req, res) => {
  const { googleId } = req.params;

  try {
    const user = await userModel.findOne({ googleId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res
      .status(200)
      .json({ status: 200, message: "User login successfully", data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// done

const sendFriendRequest = async (req, res) => {
  const { senderId, receiverId } = req.body;
  let isFriendExist = null;
  const objectId = new mongoose.Types.ObjectId();
  if (senderId === receiverId) {
    return res.status(200).json({
      status: 300,
      message: "You cant send a friend request to yourself",
    });
  }

  const friendData = await Friendship.findOne({ user_id: senderId });
  const reciverData = await Friendship.findOne({ user_id: receiverId });

  if (friendData && friendData?.friends && friendData?.friends?.length > 0) {
    isFriendExist = friendData?.friends?.find((friend) => {
      return `${friend.user}` === receiverId;
    });
    if (isFriendExist) {
      return res.status(200).json({
        status: 200,
        message: "you cant send request twice",
      });
    } else {
      try {
        friendData.friends =
          friendData?.friends?.length > 0
            ? [
                ...friendData.friends,
                {
                  user: receiverId,
                  requester: senderId,
                  _id: objectId,
                },
              ]
            : [
                {
                  user: receiverId,
                  requester: senderId,
                  _id: objectId,
                },
              ];
        reciverData.friends =
          reciverData?.friends?.length > 0
            ? [
                ...reciverData.friends,
                { user: senderId, requester: senderId, _id: objectId },
              ]
            : [{ user: senderId, requester: senderId, _id: objectId }];
        await reciverData.save();
        friendData?.save().then((response) => {
          if (response) {
            res.status(200).json({
              status: 200,
              message: "Friend request successfully",
            });
          } else {
            res.status(500).json({
              status: 500,
              message: "!opps request failed",
            });
          }
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
      }
    }
  } else {
    try {
      friendData.friends = [
        { user: receiverId, requester: senderId, _id: objectId },
      ];
      reciverData.friends = [
        { user: senderId, requester: senderId, _id: objectId },
      ];
      await reciverData.save();
      friendData?.save().then((response) => {
        if (response) {
          res.status(200).json({
            status: 200,
            message: "Friend request successfully",
          });
        } else {
          res.status(500).json({
            status: 500,
            message: "!opps request failed",
          });
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  }
};

const getFriendRequests = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(500).json({ message: "Invalid credentials" });
    }
    const friendRequests = await FriendRequest.find({
      $or: [{ receiver: userId }],
    })
      .populate("sender", ["name", "email"])
      .populate("receiver", ["name", "email"]);

    res.status(200).json({ data: friendRequests, status: 200 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const handleFriendRequest = async (req, res) => {
  const { action, requestId } = req.body;
  try {
    let friendRequest = await Friendship.findOne({ "friends._id": requestId });
    if (!friendRequest) {
      return res.status(400).json({ error: error, message: "internal error" });
    }
    if (action === "accept") {
      Friendship.updateMany(
        { "friends._id": requestId },
        { $set: { "friends.$.status": action } }
      ).then((result) => {
        res.status(200).json({
          message: "Congratulations you both are friends.",
          data: result,
          status: 200,
        });
      });
    }
    if (action === "reject") {
      Friendship.updateMany(
        { "friends._id": requestId },
        { $pull: { friends: { _id: requestId } } }
      ).then((result) => {
        res.status(200).json({
          message: "Rejected successfully.",
          status: 200,
        });
      });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ error: error.message, message: "internal error" });
  }
};

const getUsersList = async (req, res) => {
  const { id } = req.params;

  try {
    const friend = await Friendship.findOne({ user_id: id });
    if (friend?.friends.length > 0) {
      let friendsIdList = friend?.friends.map((friend) => friend.user);
      let users = await userModel.find({
        _id: { $nin: [id, ...friendsIdList] }, // Users not in the friend list
      });
      return res.status(200).json({
        data: users,
        status: 200,
        message: "Get users succesfully",
        length: users.length,
      });
    } else {
      const users = await userModel.find({
        _id: { $nin: [id] },
      });
      return res.status(200).json({
        data: users,
        status: 200,
        message: "Get users succesfully",
        length: users.length,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, success: false, message: error.message });
  }
};

module.exports = {
  signup,
  signin,
  getFriendList,
  handleFriendRequest,
  getFriendRequests,
  sendFriendRequest,
  getUsersList,
  getUserByGoogleId,
};
