import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  CssBaseline,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "../../_actions";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import Loader from "../../components/customLoader";

const Posts = (props) => {
  const dispatch = useDispatch();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [newPosttitle, setNewPostTitle] = useState("");
  const [newPostDescription, setNewPostDescription] = useState("");
  const userData = useSelector((state) => state?.auth?.user);
  const posts = useSelector((state) => state?.post?.posts);
  const createPostRes = useSelector((state) => state?.post?.create_post_res);
  const likePostRes = useSelector((state) => state?.post?.update_post_res);
  const isLoading = useSelector((state) => state.loader.isLoading);

  useEffect(() => {
    dispatch(postActions.getPosts({ id: userData?._id }));
  }, []);

  useEffect(() => {
    if (createPostRes && createPostRes?.status === 200) {
      setDialogOpen(false);
    }
  }, [createPostRes]);

  useEffect(() => {
    if (likePostRes && likePostRes.status === 200) {
      dispatch(postActions.getPosts({ id: userData?._id }));
    }
  }, [likePostRes]);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleCreatePost = async () => {
    if (newPosttitle && newPostDescription) {
      const postData = {
        title: newPosttitle,
        content: newPostDescription,
        user: userData?._id,
      };
      dispatch(postActions.createPost(postData));
    }
  };

  const likePost = (id) => {
    const sendData = {
      user: userData?._id,
      type: "like",
      postId: id,
    };
    dispatch(postActions.updatePost(sendData));
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleDialogOpen}
        style={{ position: "absolute", right: "2%" }}
      >
        Create Post
      </Button>
      {!isLoading && (
        <Box>
          <Typography variant="h4" gutterBottom color={"#1976d2"}>
            Post Section
          </Typography>
          <Box sx={{ marginTop: "10%" }}>
            {posts &&
              posts?.length > 0 &&
              posts.map((post) => (
                <Card sx={{ marginBottom: "20px" }}>
                  <CardContent>
                    {/* Post Header */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        src={
                          "https://images.pexels.com/photos/19692814/pexels-photo-19692814/free-photo-of-little-monk-eye-contact.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                        }
                        alt={post.title}
                      />
                      <div style={{ marginLeft: "1rem" }}>
                        <Typography variant="subtitle1">
                          {post.user.name}
                        </Typography>
                        <Typography variant="subtitle1">
                          {post.content}
                        </Typography>
                        <Typography variant="caption">
                          {new Date(post.createdAt).toDateString()}
                        </Typography>
                      </div>
                    </div>

                    {/* Post Content */}
                    <Typography variant="body1" style={{ marginTop: "1rem" }}>
                      {post.content}
                    </Typography>
                  </CardContent>

                  <CardActions>
                    <IconButton onClick={() => likePost(post._id)}>
                      <ThumbUpIcon
                        color={
                          post?.idsArray?.length > 0 &&
                          post?.idsArray?.includes(userData._id)
                            ? "primary"
                            : ""
                        }
                      />
                    </IconButton>
                    <IconButton>
                      <ChatBubbleOutlineIcon />
                    </IconButton>
                    <IconButton>
                      <ShareIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              ))}
          </Box>
          <Dialog open={isDialogOpen} onClose={handleDialogClose}>
            <DialogTitle color="primary">Create a New Post</DialogTitle>
            <DialogContent>
              <TextField
                label="Post Title"
                fullWidth
                variant="outlined"
                value={newPosttitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                sx={{ marginTop: "15px" }}
              />
              <TextField
                sx={{ marginTop: "15px" }}
                label="Post Discreption"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={newPostDescription}
                onChange={(e) => setNewPostDescription(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreatePost}
                style={{ marginTop: "1rem" }}
              >
                Post
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleDialogClose}
                style={{ marginTop: "1rem", marginLeft: "1rem" }}
              >
                Cancel
              </Button>
            </DialogContent>
          </Dialog>
        </Box>
      )}
      {isLoading && <Loader />}
    </>
  );
};

export default Posts;
