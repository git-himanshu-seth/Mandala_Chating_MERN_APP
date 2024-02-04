// Header.js

import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import LoginIcon from "@mui/icons-material/Login";
import ChatIcon from "@mui/icons-material/Chat";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../_assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../_actions";
import { useMediaQuery } from "@mui/material";
import Divider from "@mui/material/Divider";

const Header = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.auth?.user);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");
  const [user, setUser] = useState();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMediumScreen = useMediaQuery("(min-width:1024px)");

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const drawerList = (
    <List sx={{ marginTop: "62px" }} key={"header_1"}>
      <>
        <Divider orientation="horizontal" />
        <ListItem
          onClick={() => {
            navigate("/");
            toggleDrawer(false);
            setActiveTab("home");
          }}
          sx={{
            background: activeTab === "home" ? "#1976d2" : "#FFF",
            color: activeTab === "home" ? "#FFF" : "#1976d2",
          }}
        >
          <HomeIcon
            sx={{
              marginRight: "5px",
            }}
          />
          <ListItemText primary="Home" />
        </ListItem>
        <Divider orientation="horizontal" sx={{ color: "black" }} />
      </>
      <>
        <ListItem
          onClick={() => {
            navigate("/groups");
            toggleDrawer(false);
            setActiveTab("groups");
          }}
          sx={{
            background: activeTab === "groups" ? "#1976d2" : "#FFF",
            color: activeTab === "groups" ? "#FFF" : "#1976d2",
          }}
        >
          <GroupIcon
            sx={{
              marginRight: "5px",
            }}
          />
          <ListItemText
            primary="Groups"
            sx={{
              marginRight: "5px",
            }}
          />
        </ListItem>
        <Divider orientation="horizontal" sx={{ color: "black" }} />
      </>
      <>
        <ListItem
          onClick={() => {
            toggleDrawer(false);
            navigate("/chats");
            setActiveTab("chats");
          }}
          sx={{
            background: activeTab === "chats" ? "#1976d2" : "#FFF",
            color: activeTab === "chats" ? "#FFF" : "#1976d2",
          }}
        >
          <ChatIcon sx={{ marginRight: "5px" }} />
          <ListItemText primary="Chats" />
        </ListItem>
        <Divider orientation="horizontal" sx={{ color: "black" }} />
      </>
      {user?._id ? (
        <>
          <ListItem
            onClick={async () => {
              dispatch(authActions.logout());
              toggleDrawer(false);
              navigate("/");
              setActiveTab("home");
            }}
            sx={{
              background: "#fff",
              color: "#1976d2",
            }}
          >
            <LogoutIcon sx={{ marginRight: "5px" }} />
            <ListItemText primary="Logout" />
          </ListItem>
          <Divider orientation="horizontal" sx={{ color: "black" }} />
        </>
      ) : (
        <>
          <ListItem
            onClick={async () => {
              toggleDrawer(false);
              navigate("/login-register");
              setActiveTab("login-register");
            }}
            sx={{
              background: activeTab === "login-register" ? "#1976d2" : "#FFF",
              color: activeTab === "login-register" ? "#FFF" : "#1976d2",
            }}
          >
            <LoginIcon sx={{ marginRight: "5px" }} />
            <ListItemText primary="Login" />
          </ListItem>
          <Divider orientation="horizontal" sx={{ color: "black" }} />
        </>
      )}
      <>
        <ListItem
          onClick={() => {
            navigate("/friend");
            toggleDrawer(false);
            setActiveTab("friend");
          }}
          sx={{
            background: activeTab === "friend" ? "#1976d2" : "#FFF",
            color: activeTab === "friend" ? "#FFF" : "#1976d2",
          }}
        >
          <LogoutIcon sx={{ marginRight: "5px" }} />
          <ListItemText primary="Friends" />
        </ListItem>
      </>
      <Divider orientation="horizontal" sx={{ color: "black" }} />
    </List>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ marginTop: 0 }}>
        <Toolbar>
          <img
            src={Logo}
            alt="Logo"
            style={{ height: "70px", marginRight: "20px" }}
          />
          <Typography variant="h6">MANDALA</Typography>
          <Box ml={2} width={"80%"}>
            <Box sx={{ float: "right" }}>
              {isMediumScreen ? (
                <>
                  <Button
                    color="inherit"
                    startIcon={<HomeIcon />}
                    onClick={() => navigate("/")}
                  >
                    Home
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={<GroupIcon />}
                    onClick={() => navigate("/groups")}
                  >
                    Groups
                  </Button>
                  {/* <Button
                    color="inherit"
                    startIcon={<PostAddIcon />}
                    onClick={() => navigate("/posts")}
                  >
                    Posts
                  </Button> */}
                  <Button
                    color="inherit"
                    startIcon={<ChatIcon />}
                    onClick={() => navigate("/chats")}
                  >
                    Chats
                  </Button>
                  {user?._id ? (
                    <Button
                      color="inherit"
                      startIcon={<LogoutIcon />}
                      onClick={async () => {
                        dispatch(authActions.logout());
                        navigate("/");
                      }}
                    >
                      Logout
                    </Button>
                  ) : (
                    <Button
                      color="inherit"
                      startIcon={<LoginIcon />}
                      onClick={async () => {
                        navigate("/login-register");
                      }}
                    >
                      Login
                    </Button>
                  )}
                  <Button color="inherit" onClick={() => navigate("/friend")}>
                    Friends
                  </Button>
                </>
              ) : (
                <IconButton
                  color="inherit"
                  edge="start"
                  onClick={() => toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        sx={{
          "& .MuiDrawer-paper": {
            width: "40%",
            boxSizing: "border-box",
          },
        }}
        open={drawerOpen}
        onClose={() => {
          toggleDrawer(false);
        }}
      >
        <Box style={{ height: "100%" }}>{drawerList}</Box>
      </Drawer>
    </>
  );
};

export default Header;
