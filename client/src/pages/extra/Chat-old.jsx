// Chat.js

import React, { useEffect, useState } from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
// import UserImage from "./userImage.jpg"; // Import your user image

const Chat = () => {
  useEffect(() => {
    document.title = "home";
  }, []);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const currentTime = getCurrentTime();
      setMessages([
        ...messages,
        { text: newMessage, sender: "user", time: currentTime },
      ]);
      setNewMessage("");
      // Add logic for handling sent messages (e.g., sending to a server, etc.)
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
        // padding: "10px",
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
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: message.sender === "user" ? "row-reverse" : "row",
              alignItems: "flex-end",
            }}
          >
            {message.sender !== "user" && (
              <img
                src={
                  "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                }
                alt="User"
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  marginRight: "8px",
                }}
              />
            )}
            <div style={{ maxWidth: "70%" }}>
              <div>{message.text}</div>
              <div style={{ fontSize: "10px", color: "#888" }}>
                {message.time}
              </div>
            </div>
          </div>
        ))}
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

export default Chat;
