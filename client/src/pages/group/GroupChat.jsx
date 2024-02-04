import React, { useEffect, useState } from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import user from "../../_assets/images/user.png";
import { groupActions } from "../../_actions";

const GroupChat = ({ groupId, oldMessages }) => {
  const socket = io("ws://localhost:8080", {
    reconnectionDelayMax: 10000,
    auth: {
      token: "123",
    },
  });
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const userData = useSelector((state) => {
    return state?.auth?.user;
  });
  useEffect(() => {
    setMessages(oldMessages);
  }, [oldMessages.length]);

  useEffect(() => {
    socket.emit("joinRoom", `${groupId}`);
    socket.on("connect", (res) => {});
    socket.on("disconnect", (res) => {});
  });
  socket.on("reciveMessage", (data) => {
    setMessages([...messages, data]);
  });

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const data = {
        content: newMessage.trim(),
        sender: { name: userData.name },
        timestamp: new Date(),
        groupId: `${groupId}`,
      };
      socket.emit("sendMessage", data);
      dispatch(
        groupActions.sendMessage({
          message: newMessage.trim(),
          userId: userData._id,
          groupId: groupId,
        })
      );
      setMessages([...messages, data]);
      setNewMessage("");
    }
  };

  return (
    <Box
      elevation={0}
      style={{
        marginTop: "20px",
        marginLeft: "20px",
        marginRight: "20px",
        display: "flex",
        flexDirection: "column",
        border: "2px solid rgb(25 118 210)",
        borderRadius: "20px",
        padding: "20px 8px 12px 0px",
      }}
    >
      <div
        style={{
          height: "624px",
          overflow: "scroll",
          marginBottom: "10px",
          overflowX: "hidden",
        }}
      >
        {messages.map((message, index) => {
          const userImage = userData?.imageUrl ? userData.imageUrl : user;
          const senderImage = message.imageUrl ? message.imageUrl : user;
          const date = new Date(message.timestamp);
          const time = `${date.getHours()}:${date.getMinutes()}`;

          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection:
                  message.sender.name === userData.name ? "row-reverse" : "row",
                alignItems: "flex-end",
              }}
            >
              <img
                src={
                  message.sender.name !== userData.name
                    ? senderImage
                    : userImage
                }
                alt="User"
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  marginRight: "20px",
                  marginLeft: "8px",
                }}
              />
              <div
                style={{
                  maxWidth: "70%",
                  background:
                    message.sender.name !== userData.name
                      ? " #1976d2"
                      : "white",
                  color:
                    message.sender.name !== userData.name ? "white" : "#1976d2",
                  padding: "2px 8px 3px 7px",
                  borderRadius: "15px",
                  border:
                    message.sender.name !== userData.name
                      ? " solid 3px white"
                      : " solid 3px #1976d2",
                  marginTop: "4px",
                }}
              >
                <div
                  style={{ borderRadius: "30px", border: "2px sloid 31976d2" }}
                >
                  {message.content}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color:
                      message.sender.name !== userData.name
                        ? "#ffff"
                        : "#1976d2",
                  }}
                >
                  {time}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          alignSelf: "center",
          marginTop: "10px",
          marginBottom: "10px",
          minWidth: "90%",
          maxWidth: "50%",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Type a message"
          fullWidth
          value={newMessage}
          onChange={handleInputChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          style={{ marginLeft: "10px" }}
        >
          Send
        </Button>
      </div>
    </Box>
  );
};

export default GroupChat;
