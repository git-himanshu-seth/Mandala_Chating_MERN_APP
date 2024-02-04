const express = require("express");
// const {getAllPosts, likePost, addComment , createPost} =require("../controllers/postControlers")

const {
  signup,
  signin,
  getFriendList,
  handleFriendRequest,
  getFriendRequests,
  sendFriendRequest,
  getUsersList,
  getUserByGoogleId,
} = require("../controllers/userControler");

const {
  getChats,
  sendMessage,
  deleteChats,
} = require("../controllers/chatControlers");
const {
  createPost,
  getAllPosts,
  commentsAndLikes,
} = require("../controllers/postControlers");
const {
  createGroup,
  getAllGroups,
  updateGroup,
  sendJoinRequest,
  handleJoinRequest,
  sendGroupMessage,
} = require("../controllers/groupControler");

const appRoute = express.Router();

appRoute.route("/signup").post(signup);
appRoute.route("/user/:googleId").get(getUserByGoogleId);

appRoute.route("/signin").post(signin);
appRoute.route("/chat_group").post(createGroup).get(getAllGroups);

// FRIENDS ROUTES
//********************************************************************************************************************************************/
//GET USERS LISTS
appRoute.route("/users/:id").get(getUsersList);

// friend requests routes
appRoute.route("/send-friend-request").post(sendFriendRequest);

// GET FRIEND LIST ROUTE
appRoute.route("/friends/:id").get(getFriendList);

// Route to accept or reject a friend request
appRoute.route("/handle-friend-request").put(handleFriendRequest);

// Route to get all friend requests for a user
appRoute.route("/get-friend-requests/:userId").get(getFriendRequests);

//********************************************************************************************************************************************/

// POST ROUTES
//********************************************************************************************************************************************/

appRoute.route("/post").post(createPost);
appRoute.route("/posts/:userId").get(getAllPosts);
appRoute.route("/like_and_comments").post(commentsAndLikes);

// CHATS ROUTES
//********************************************************************************************************************************************/

// appRoute.route("/chat").post(createChat);
appRoute.route("/chat/message").post(sendMessage);
appRoute.route("/chats/get_message/:user/:sender").get(getChats);
appRoute.route("/chats/:chat_id").delete(deleteChats);

// GROUP ROUTES
//********************************************************************************************************************************************/
appRoute.route("/create_group").post(createGroup);
appRoute.route("/get_groups/:userId").get(getAllGroups);
appRoute.route("/update_group").put(updateGroup);
appRoute.route("/send_group_request").post(sendJoinRequest);
appRoute.route("/handle_group_request").post(handleJoinRequest);
appRoute.route("/send_group_message").post(sendGroupMessage);

module.exports = appRoute;
