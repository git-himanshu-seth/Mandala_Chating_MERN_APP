import Register from "../../components/Register";
import Login from "../../components/Login";
import { useEffect, useState } from "react";
import { Container, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import firebaseAuthManager from "../utilis/services/firebase";

const LoginAndRegister = () => {
  const navigate = useNavigate();
  useEffect(() => {}, []);
  const [toggleLoginAndRegister, setToggleLoginAndRegister] = useState(false);
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        border: "2px solid #1565c0",
        borderRadius: "10px",
        marginTop: "5%",
        padding: "5%",
      }}
    >
      {toggleLoginAndRegister ? <Register /> : <Login />}
      <Grid mt={4}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => {
            setToggleLoginAndRegister(!toggleLoginAndRegister);
          }}
        >
          {toggleLoginAndRegister ? "Login" : "Register"}
        </Button>
      </Grid>
    </Container>
  );
};

export default LoginAndRegister;
