import { Box, Paper, Button, TextField, Typography} from '@mui/material';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../../ContextProvider";
import shoplogo from '../../../Assets/shoplogo.jpg';
import loginpage from '../../../Assets/loginpage.jpg'

export default function Login() {
  const { host } = useContext(UserContext);
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    axios.post(`${host}/api/user/Login`, login)
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("userToken", res.data.Token);
          localStorage.setItem("userRole", res.data.role);

          Swal.fire({
            title: 'Success!',
            text: 'You are logged in',
            icon: 'success',
            confirmButtonText: 'Continue'
          }).then(() => {
            const redirectPath =
              localStorage.getItem("redirectAfterLogin") || '/';
            localStorage.removeItem("redirectAfterLogin");

            if (res.data.role === 'admin') {
              navigate("/Admin");
            } else {
              navigate(redirectPath);
            }
          });
        } else {
          Swal.fire('Error', 'Invalid email or password', 'error');
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire('Error', 'Something went wrong', 'error');
      });
  };

  return (
    <Box
  sx={{
    minHeight: "100vh",
    backgroundColor: "#eee",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    p: 2,
  }}
>
  <Paper
    elevation={6}
    sx={{
      width: "100%",
      maxWidth: 1000, // maximum width for desktop
      height: 600, // fixed height
      borderRadius: 3,
      overflow: "hidden",
      display: "flex", // make Paper a flex container
    }}
  >
    {/* LEFT SIDE: LOGIN FORM */}
    <Box
      sx={{
        flex: 1,
        p: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <Box textAlign="center">
        <img src={shoplogo} alt="logo" style={{ width: 120, borderRadius: 10 }} />
        <Typography variant="h5" sx={{ mt: 2, mb: 3, fontWeight: "bold" }}>
          Welcome Back
        </Typography>
      </Box>

      <Typography sx={{ mb: 3, textAlign: "center", color: "text.secondary" }}>
        Please login to your account
      </Typography>

      <TextField
        label="Email"
        name="email"
        type="email"
        fullWidth
        sx={{ mb: 3 }}
        onChange={handleChange}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        fullWidth
        sx={{ mb: 3 }}
        onChange={handleChange}
      />

      <Button
        variant="contained"
        fullWidth
        sx={{
          py: 1.5,
          borderRadius: 2,
          background: "linear-gradient(to right, #6a11cb, #2575fc)",
          fontWeight: "bold",
          fontSize: "1rem",
        }}
        onClick={handleLogin}
      >
        Login
      </Button>

      <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
        <Typography sx={{ mr: 1, color: "text.secondary" }}>Don't have an account?</Typography>
        <Button variant="outlined"  href="/Registration" sx={{
          py: 1,
          borderRadius: 2,
          color:"white",
          background: "linear-gradient(to right, #de34d8ff, #2575fc)",
          fontWeight: "bold",
          fontSize: "1rem",
        }} >
          Register
        </Button>
      </Box>
    </Box>

    {/* RIGHT SIDE: LOGIN IMAGE */}
    <Box sx={{ flex: 1 }}>
      <img
        src={loginpage}
        alt="Login"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </Box>
  </Paper>
</Box>

  );
}