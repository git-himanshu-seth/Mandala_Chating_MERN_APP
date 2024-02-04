import React, { useState, useRef, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  InputLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { loginWithEmailAndPassword } from "../utilis/services/firebase";
import firebaseAuthManager from "../utilis/services/firebase";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import { authActions } from "../_actions/auth.actions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const loginData = useSelector((state) => state.auth.user);
  const passwordRef = useRef(null);

  useEffect(() => {
    if (loginData && loginData?._id) {
      navigate("/");
    }
  }, [loginData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(authActions.login(formData));
  };

  return (
    <>
      <Typography variant="h5" align="center" color="primary">
        Log in
      </Typography>
      <form onSubmit={handleSubmit}>
        <InputLabel
          htmlFor="email"
          style={{ marginTop: "20px", color: "#1976d2" }}
        >
          Email Address<span style={{ color: "red" }}>*</span>
        </InputLabel>
        <TextField
          variant="outlined"
          sx={{ input: { color: "#1976d2" } }}
          required
          fullWidth
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={handleChange}
          autoComplete="off"
          te
        />
        <InputLabel
          htmlFor="password"
          style={{ marginTop: "10px", color: "#1976d2" }}
        >
          Password<span style={{ color: "red" }}>*</span>
        </InputLabel>
        <TextField
          variant="outlined"
          required
          sx={{ input: { color: "#1976d2" } }}
          fullWidth
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="off"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => handleTogglePasswordVisibility()}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                  sx={{ color: "#1976d2" }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
            placeholder: "Enter your password",
          }}
          inputRef={passwordRef}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
        >
          Log In
        </Button>
      </form>
    </>
  );
};

export default Login;
