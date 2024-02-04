import React, { useState, useEffect } from "react";
import io from "socket.io-client";

// const socket = io("http://localhost:8000", { withCredentials: false });

function Socket() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  // useEffect(() => {
  //   socket.on("chat message", (msg) => {
  //     setMessages([...messages, msg]);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [messages]);

  // const handleSendMessage = () => {
  //   socket.emit("chat message", message);
  //   setMessage("");
  // };

  return (
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      {/* <button onClick={handleSendMessage}>Send</button> */}
    </div>
  );
}

export default Socket;
