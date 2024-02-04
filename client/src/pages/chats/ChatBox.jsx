import React, { useEffect, useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import user from "../../_assets/images/user.png";
import { friendActions } from "../../_actions";

const ChatBox = ({ chatId, oldMessages }) => {
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
  }, []);
  useEffect(() => {
    socket.emit("joinRoom", `${chatId}`);
    socket.on("connect", (res) => {});
    socket.on("disconnect", (res) => {});
  });
  socket.on("reciveOneToOneMessage", (data) => {
    setMessages([...messages, { message: data }]);
  });

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const data = {
        content: newMessage.trim(),
        sender: { name: userData?.name },
        timestamp: new Date(),
        chatId: `${chatId}`,
      };
      socket.emit("sendOneToOneMessage", data);
      dispatch(
        friendActions.sendMessage({
          message: newMessage.trim(),
          user: userData?._id,
          chatId: "65bf073103a9e2377affb2a1",
        })
      );
      setMessages([...messages, { message: data }]);
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
          const userImage = userData?.imageUrl ? userData?.imageUrl : user;
          const senderImage = message?.message?.imageUrl
            ? message?.message?.imageUrl
            : user;
          const date = new Date(message?.message?.timestamp);
          const time = `${date.getHours()}:${date.getMinutes()}`;
          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection:
                  message?.message?.sender?.name === userData.name
                    ? "row-reverse"
                    : "row",
                alignItems: "flex-end",
              }}
            >
              <img
                src={
                  message?.message?.sender?.name !== userData.name
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
              <div style={{ maxWidth: "70%" }}>
                <div>{message?.message?.content}</div>
                <div style={{ fontSize: "10px", color: "#888" }}>{time}</div>
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

export default ChatBox;
