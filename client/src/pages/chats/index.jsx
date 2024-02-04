import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Box,
} from "@mui/material";
import ChatBox from "./ChatBox";
import { useDispatch, useSelector } from "react-redux";
import { friendActions } from "../../_actions";
import Loader from "../../components/customLoader";

const Chats = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => {
    return state?.auth?.user;
  });
  const chatData = useSelector((state) => state?.friend?.messages);
  console.log("chat", chatData);
  const friendList = useSelector((state) => {
    return state?.friend?.friends;
  });

  const [chatSectionOpen, setChatSectionOpen] = useState(false);
  const isLoading = useSelector((state) => state.loader.isLoading);
  const [chatId, setChatId] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(-1);

  useEffect(() => {
    if (userData?._id) {
      dispatch(friendActions.getFriendsList({ id: userData._id }));
    }
  }, []);

  return (
    <Box mb={5}>
      {!isLoading && (
        <>
          {friendList && friendList.length > 0 && (
            <Box display="flex" flexDirection={"row"}>
              <Box
                width={"30%"}
                marginLeft={"10px"}
                marginTop={"20px"}
                sx={{
                  border: "2px solid rgb(25 118 210)",
                  borderRadius: "20px",
                  padding: "20px 8px 12px 0px",
                }}
              >
                <List
                  marginTop={"20px"}
                  sx={{
                    overflow: "scroll",
                    overflowX: "hidden",
                    height: "600px",
                    width: "100%",
                  }}
                >
                  {friendList &&
                    friendList?.length > 0 &&
                    // eslint-disable-next-line array-callback-return
                    friendList?.map((friend, index) => {
                      if (friend.status === "accept") {
                        return (
                          // <React.Fragment key={friend._id}>
                          <Box
                            key={friend._id}
                            sx={{
                              width: "90%",
                              alignSelf: "center",
                              marginLeft: "20px",
                            }}
                          >
                            <ListItem
                              alignItems="flex-start"
                              sx={{
                                background:
                                  index === selectedFriend
                                    ? "#1976d2"
                                    : "white",
                                color:
                                  index === selectedFriend
                                    ? "white "
                                    : "#1976d2",
                                borderRadius: "40px",
                                border: "solid 3px  #1976d2",
                                marginTop: "10px",
                              }}
                              onClick={() => {
                                setChatSectionOpen(true);
                                setChatId(`${friend._id}`);
                                setSelectedFriend(index);
                                dispatch(
                                  friendActions.getMessages({
                                    receiverId: friend.user._id,
                                    userId: userData._id,
                                  })
                                );
                              }}
                            >
                              <ListItemAvatar>
                                <Avatar
                                  src={
                                    "https://images.pexels.com/photos/19692814/pexels-photo-19692814/free-photo-of-little-monk-eye-contact.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                                  }
                                  alt={friend.user.name}
                                />
                              </ListItemAvatar>
                              <ListItemText
                                primary={friend.user.name}
                                sx={{ alignSelf: "center" }}
                              />
                            </ListItem>
                            {/* <Divider variant="fullWidth" />
                          </React.Fragment> */}
                          </Box>
                        );
                      }
                    })}
                </List>
              </Box>
              {chatSectionOpen && selectedFriend !== -1 && (
                <Box width="70%">
                  <ChatBox
                    chatId={chatData?.chat_id}
                    oldMessages={chatData?.messages}
                  />
                </Box>
              )}
            </Box>
          )}
        </>
      )}
      {isLoading && <Loader />}
    </Box>
  );
};

export default Chats;
