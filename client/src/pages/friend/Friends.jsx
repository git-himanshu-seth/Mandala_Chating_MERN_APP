import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Container,
  Box,
  Button,
} from "@mui/material";
import { friendActions, hideLoader, showLoader } from "../../_actions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/customLoader";

const Friends = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => {
    return state?.auth?.user;
  });

  const friendList = useSelector((state) => {
    return state?.friend?.friends;
  });
  const requestStatus = useSelector((state) => state.friend?.acceptRejRes);
  const isLoading = useSelector((state) => state.loader.isLoading);

  useEffect(() => {
    dispatch(friendActions.getFriendsList({ id: userData._id }));
  }, []);

  useEffect(() => {
    if (requestStatus && requestStatus?.status === 200) {
      dispatch(friendActions.getFriendsList({ id: userData._id }));
    }
  }, [requestStatus]);

  const handleAcceptRequest = (action, id) => {
    const sendData = {
      action: action,
      requestId: id,
    };
    dispatch(friendActions.acceptReq(sendData));
  };
  
  return (
    <Box>
      <Typography variant="h4" gutterBottom color={"#1976d2"}>
        Friends List
      </Typography>
      {!isLoading && (
        <List>
          {friendList &&
            userData?._id &&
            friendList.length > 0 &&
            friendList.map((friend) => {
              return (
                <React.Fragment key={1}>
                  <ListItem>
                    <ListItemText
                      primary={friend?.user?.name}
                      secondary={friend?.user?.email}
                      sx={{ width: "33%" }}
                    />
                    <>
                      <ListItemText
                        primary={"Status"}
                        secondary={friend?.status}
                        sx={{ width: "33%" }}
                      />
                    </>
                    {userData &&
                      friend?.status === "pending" &&
                      friend?.requester !== `${userData?._id}` && (
                        <>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() =>
                              handleAcceptRequest("accept", friend?._id)
                            }
                            sx={{ marginRight: "20px" }}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() =>
                              handleAcceptRequest("reject", friend?._id)
                            }
                          >
                            Reject
                          </Button>
                        </>
                      )}
                  </ListItem>
                  <Divider />
                </React.Fragment>
              );
            })}
        </List>
      )}
      {isLoading && <Loader />}
    </Box>
  );
};

export default Friends;
