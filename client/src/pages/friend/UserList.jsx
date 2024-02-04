import React, { useState, useEffect, useCallback } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Box,
  Button,
} from "@mui/material";
import {
  authActions,
  friendActions,
  hideLoader,
  showLoader,
} from "../../_actions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/customLoader";

const UserList = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => {
    return state?.auth?.user;
  });

  const userListData = useSelector((state) => {
    return state?.auth?.userList?.data;
  });

  const sendRequestResponse = useSelector((state) => {
    return state?.friend?.req;
  });

  useEffect(() => {
    if (sendRequestResponse?.status === 200) {
      getUserList(userData._id);
    }
  }, [sendRequestResponse]);

  const isLoading = useSelector((state) => state.loader.isLoading);

  useEffect(() => {
    getUserList(userData._id);
  }, []);

  const getUserList = (id) => {
    dispatch(authActions.getUsers({ id: id }));
  };

  const handleSendRequest = (id) => {
    const sendData = {
      senderId: userData?._id,
      receiverId: id,
    };
    dispatch(friendActions.sendFrienReq(sendData));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom color={"#1976d2"}>
        User List
      </Typography>
      {!isLoading && (
        <List>
          {userListData &&
            userListData?.length > 0 &&
            userListData?.map((user) => (
              <React.Fragment key={user.id}>
                <ListItem>
                  <ListItemText primary={user.name} />
                  <ListItemText primary={user.email} />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSendRequest(user._id)}
                  >
                    Send Request
                  </Button>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
        </List>
      )}
      {isLoading && <Loader />}
    </Box>
  );
};

export default UserList;
