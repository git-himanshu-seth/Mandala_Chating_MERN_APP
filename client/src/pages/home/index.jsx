import React from "react";
import { Typography, Container, Grid, Paper } from "@mui/material";
import { useSpring, animated } from "react-spring";

function Home() {
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  return (
    <div style={{ flexGrow: 1, paddingTop: "16px" }}>
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <Typography variant="h4" color="primary">
                Social Media App
              </Typography>
              <Typography variant="h5" color="textSecondary">
                Connect with friends and share your moments.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <animated.div style={{ ...fadeIn, marginBottom: "16px" }}>
              <Paper style={{ padding: "16px", textAlign: "center" }}>
                <Typography variant="h6" color="primary">
                  Discover Communities
                </Typography>
                <Typography variant="body1">
                  Join vibrant communities based on your interests. Connect with
                  like-minded people and share your experiences.
                </Typography>
              </Paper>
            </animated.div>
          </Grid>
          <Grid item xs={12}>
            <animated.div style={{ ...fadeIn, marginBottom: "16px" }}>
              <Paper style={{ padding: "16px", textAlign: "center" }}>
                <Typography variant="h6" color="primary">
                  Share Your Moments
                </Typography>
                <Typography variant="body1">
                  Post photos, updates, and more. Let your friends know what
                  you're up to and stay connected.
                </Typography>
              </Paper>
            </animated.div>
          </Grid>
          <Grid item xs={12}>
            <animated.div style={{ ...fadeIn }}>
              <Paper style={{ padding: "16px", textAlign: "center" }}>
                <Typography variant="h6" color="primary">
                  Stay Informed
                </Typography>
                <Typography variant="body1">
                  Get updates on the latest trends and events. Stay informed
                  about what's happening in your community.
                </Typography>
              </Paper>
            </animated.div>
          </Grid>
          <Grid item xs={12}>
            <animated.div style={{ ...fadeIn, marginTop: "16px" }}>
              <img
                src="https://placekitten.com/400/200"
                alt="Social Media"
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </animated.div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
