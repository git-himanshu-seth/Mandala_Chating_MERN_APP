// RegisterPage.js
import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleLoginComponent from "./LoginWithGmail";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../_actions";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    showPassword: false,
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const registerData = useSelector((state) => {
    return state?.auth?.user;
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleTogglePasswordVisibility = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { firstName: "", lastName: "", email: "", password: "" };

    if (formData.firstName.trim() === "") {
      newErrors.firstName = "First Name is required";
      valid = false;
    }

    if (formData.lastName.trim() === "") {
      newErrors.lastName = "Last Name is required";
      valid = false;
    }

    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (formData.password.trim() === "") {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formValid = validateForm();

    if (formValid) {
      dispatch(authActions.createUser(formData));
    } else {
      console.log("Form validation failed");
    }
  };

  useEffect(() => {
    if (registerData && registerData?._id) {
      navigate("/");
    }
  }, [registerData]);

  return (
    <>
      <Typography variant="h5" align="center" mb={2}>
        Sign up
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} mb={4}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              First Name <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <Typography color="error">{errors.firstName}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              Last Name <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
            />
            <Typography color="error">{errors.lastName}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              Email Address <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
            />
            <Typography color="error">{errors.email}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              Password <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              type={formData.showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility}>
                      {formData.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Typography color="error">{errors.password}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Register
            </Button>
          </Grid>
          <Grid item xs={12}>
            <GoogleLoginComponent />
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default RegisterPage;
