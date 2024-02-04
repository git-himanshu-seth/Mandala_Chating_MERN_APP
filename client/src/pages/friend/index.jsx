import React, { useState, useEffect } from "react";
import { Container, Box, Button } from "@mui/material";
import Friends from "./Friends";
import UserList from "./UserList";
import Posts from "./Post";

const FriendScreen = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <Container>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <Box display={"flex"} flexDirection={"row"}>
          <Button
            size="large"
            variant={activeTab === 1 ? "contained" : "outlined"}
            onClick={() => setActiveTab(1)}
            sx={{ marginRight: "15px" }}
          >
            Friends
          </Button>
          <Button
            size="large"
            variant={activeTab === 2 ? "contained" : "outlined"}
            onClick={() => setActiveTab(2)}
            sx={{ marginRight: "15px" }}
          >
            Posts
          </Button>
          <Button
            size="large"
            variant={activeTab === 3 ? "contained" : "outlined"}
            onClick={() => setActiveTab(3)}
            sx={{ marginRight: "15px" }}
          >
            Make New Friends
          </Button>
        </Box>
        {activeTab === 1 && <Friends />}
        {activeTab === 2 && <Posts />}
        {activeTab === 3 && <UserList />}
      </Box>
    </Container>
  );
};

export default FriendScreen;
