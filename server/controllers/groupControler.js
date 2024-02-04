const { default: mongoose } = require("mongoose");
const Group = require("../models/groupSchema");
const { response } = require("express");

// CREATE NEW GROUP
const createGroup = (req, res) => {
  const { name, userId, description, members } = req.body;
  if (members && members.length > 0) {
    let isUserExitInMembers = members.filter(
      (member) => member.user === userId
    );
    if (isUserExitInMembers.length > 0) {
      return res
        .status(200)
        .json({ message: "UserId exist in memebers list", status: 400 });
    }
  }
  try {
    let newGroup = new Group({
      name,
      admin: userId,
      description,
      members: members,
    });
    newGroup.save().then((result) => {
      if (result) {
        return res.status(200).json({
          status: 200,
          message: `Group ${name} created successfully`,
          data: result,
        });
      } else {
        return res
          .status(400)
          .json({ status: 400, message: "Internal Server Error" });
      }
    });
  } catch (e) {
    return res
      .status(400)
      .json({ status: 400, message: "Internal Server Error", error: e });
  }
};

//GET ALL GROUPS LIST
const getAllGroups = async (req, res) => {
  const userId = req.params.userId;
  // if (!userId) {
  //   return res
  //     .status(404)
  //     .json({ message: "UserId is required in params", status: 400 });
  // }
  Group.find({
    $or: [{ admin: userId }, { "members.user": userId }],
  })
    .populate("admin members.user messages.sender")
    .then((result, error) => {
      console.log(error);
      return res.status(200).json({
        message: result.length
          ? "Groups and messages retrived successfully"
          : "No group found",
        status: 200,
        data: result,
        length: result.length,
      });
    })
    .catch((e) => {
      return res
        .status(400)
        .json({ status: 400, message: "Internal Server Error", success });
    });
};

//UPDATE GROUP
const updateGroup = async (req, res) => {
  const { name, description, groupId, userId } = req.body;
  try {
    const group = await Group.findOne({ admin: userId, _id: groupId });
    if (group) {
      group.description = description ? description : group.description;
      group.name = name ? name : group.name;
      let upadted = await group.save();

      return res.status(200).json({
        message: "Group details updated succesffully",
        status: 200,
        data: upadted,
      });
    } else {
      return res.status(400).json({ message: "Group not found", status: 400 });
    }
  } catch (err) {
    return res.status(400).json({
      message: "Props are not valid",
      status: 400,
      error: err.message,
    });
  }
};

//SEND GROUP JOIN REQUEST
const sendJoinRequest = async (req, res) => {
  const { userId, newMembers, groupId } = req.body;
  if (!newMembers) {
    return res
      .status(400)
      .json({ message: "Please pass members", status: 400 });
  }
  try {
    const group = await Group.findOne({ admin: userId, _id: groupId });
    const members = group.members.map((member) => `${member.user}`);
    let newMembersList = newMembers.split(",");
    let filtedMembersList = newMembersList.reduce((acc, member) => {
      if (!members.includes(member.trim())) {
        const ObjectId = mongoose.Types.ObjectId;
        console.log("USER", member.trim());
        acc
          ? acc.push({ user: member.trim() })
          : (acc = [
              {
                user: member.trim(),
              },
            ]);
        return acc;
      }
    }, []);
    if (filtedMembersList && filtedMembersList.length > 0) {
      group.members = [...group.members, ...filtedMembersList];
      let updatedGroup = await group.save();
      return res.status(400).json({
        message: "Send join request successfully",
        status: 200,
        data: updatedGroup,
      });
    } else {
      return res.status(400).json({
        message: "All members are already exist in group",
        status: 400,
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: "Props are not valid",
      status: 400,
      error: err.message,
    });
  }
};

//HANDLE REQUEST
const handleJoinRequest = async (req, res) => {
  const { userId, status, groupId } = req.body;
  try {
    if (status === "accept") {
      Group.findOneAndUpdate(
        {
          _id: groupId,
          "members.user": { $in: userId },
        },
        { $set: { "members.$.status": status } }
      )
        .then((result, err) => {
          if (result) {
            return res
              .status(200)
              .json({ message: "Request accepted successfully", status: 200 });
          } else {
            return res.status(500).json({ message: err.message, status: 500 });
          }
        })
        .catch((err) =>
          res.status(500).json({ message: err.message, status: 500 })
        );
    }
    if (status === "reject") {
      Group.findOneAndUpdate(
        {
          _id: groupId,
          "members.user": { $in: userId },
        },
        { $pull: { members: { user: { $in: userId } } } }
      )
        .then((result, err) => {
          if (result) {
            return res
              .status(200)
              .json({ message: "Request rejected successfully", status: 200 });
          } else {
            return res.status(500).json({ message: err.message, status: 500 });
          }
        })
        .catch((err) =>
          res.status(500).json({ message: err.message, status: 500 })
        );
    }
  } catch (e) {
    return res.status(500).json({ message: e.message, status: 500 });
  }
};

//SEND MESSAGE
const sendGroupMessage = (req, res) => {
  const { message, userId, groupId } = req.body;
  try {
    Group.findOneAndUpdate(
      {
        _id: groupId,
        $or: [{ "members.user": { $in: userId } }, { admin: userId }],
      },
      { $push: { messages: { sender: userId, content: message } } }
    )
      .then((result) => {
        console.log(result);
        if (result) {
          return res
            .status(200)
            .json({ message: "Message sent successfully", status: 200 });
        } else {
          return res.status(500).json({
            message: "You are not the member of the group",
            status: 500,
          });
        }
      })
      .catch((err) =>
        res.status(500).json({ message: err.message, status: 500 })
      );
  } catch (err) {
    res.status(500).json({ message: err.message, status: 500 });
  }
};

module.exports = {
  createGroup,
  getAllGroups,
  updateGroup,
  sendJoinRequest,
  handleJoinRequest,
  sendGroupMessage,
};
