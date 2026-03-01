import { Box, Button, Paper, TextField, Typography, Link } from '@mui/material';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../../ContextProvider";

export default function Registration() {
  const navigate = useNavigate();
  const { host } = useContext(UserContext);

  const [user, setUser] = useState({
    uname: "",
    uemail: "",
    upassword: "",
    uphone: "",
    uaddress: ""
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios.post(`${host}/api/user/Adduser`, user)
      .then(() => {
        alert("User registered successfully!");
        navigate("/Login");
      })
      .catch((err) => {                                        // ← capture the error
        console.error("Registration error:", err.response?.data); // ← print real error in console
        alert(err.response?.data?.message || "Server error"); // ← show real message in alert
      });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f0f4f8', // light background
        p: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: { xs: '100%', sm: '450px' },
          p: 5,
          borderRadius: 4,
          boxShadow: '0px 10px 30px rgba(0,0,0,0.1)',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            mb: 4,
            textAlign: 'center',
            color: '#333'
          }}
        >
          Registration
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Name"
            name="uname"
            value={user.uname}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="uemail"
            type="email"
            value={user.uemail}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="upassword"
            type="password"
            value={user.upassword}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            label="Phone"
            name="uphone"
            type="number"
            value={user.uphone}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            label="Address"
            name="uaddress"
            value={user.uaddress}
            fullWidth
            onChange={handleChange}
          />
        </Box>

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 4,
            py: 1.5,
            borderRadius: 3,
            background: 'linear-gradient(to right, #00c6ff, #0072ff)', // teal-blue gradient
            fontWeight: 'bold',
            fontSize: '1rem',
            color: 'white',
            '&:hover': { background: 'linear-gradient(to right, #0072ff, #00c6ff)' },
          }}
          onClick={handleSubmit}
        >
          REGISTER
        </Button>

        <Typography variant="body2" sx={{ mt: 3, textAlign: 'center', color: '#555' }}>
          Already have an account?{' '}
          <Link href="/Login" underline="hover" sx={{ fontWeight: 'bold', color: '#0072ff' }}>
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
