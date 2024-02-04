import React from "react";
import { Typography, Container, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import ErrorImage from "../_assets/images/ErrorImage.png"; // Import your image

const NotFound = () => {
  return (
    <Container>
      <Box mt={5} textAlign="center">
        <img
          src={ErrorImage}
          alt="404 Not Found"
          style={{ maxWidth: "60%", height: "auto" }}
        />
      </Box>
      <Box mt={3} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Oops! Page not found
        </Typography>
        <Typography variant="body1" paragraph>
          The page you are looking for might be in another castle!
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Go Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
