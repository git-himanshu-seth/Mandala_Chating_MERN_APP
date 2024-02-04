// SideBar.js

import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ChatIcon from "@mui/icons-material/Chat";

const SideBar = ({ isOpen, onClose }) => {
  return (
    // <Drawer anchor="left" open={isOpen} onClose={onClose}>
    <Paper
      elevation={4}
      style={{
        borderRadius: "0",
        minHeight: "665px",
        maxHeight: "100%",
      }}
    >
      <List>
        <ListItem>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <PostAddIcon />
          </ListItemIcon>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
        </ListItem>
      </List>
    </Paper>
    // </Drawer>
  );
};

export default SideBar;
