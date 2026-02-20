import React, { useState } from "react";
import { TextField, Button, Paper, Box, Typography } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../ContextProvider";
import { useContext } from "react";

export default function AdminLogin() {
  const {host}=useContext(UserContext);
const navigate=useNavigate();

const [login , setLogin]= useState({
    email:'',
    password:''
})

const handleChange=(e)=>{
 setLogin({...login, [e.target.name]:e.target.value});
}

// AdminLogin.js - Use regular user login but check for admin role
const handleAdminLogin = () => {
    axios.post(`${host}/api/user/Login`, login)
      .then((res) => {
        if (res.data.success) {
          // Check if user has admin role
          if (res.data.role !== "admin") {
            Swal.fire("Access Denied", "You are not an Admin!", "error");
            return;
          }

          localStorage.setItem("userToken", res.data.Token);
          localStorage.setItem("userRole", res.data.role);
          
          Swal.fire("Success", "Admin Login Successful!", "success").then(() => {
            navigate("/Admin/Dashboard");
          });

        } else {
          Swal.fire("Error", "Login Failed", "error");
        }
      })
      .catch(() => Swal.fire("Error", "Something went wrong", "error"));
};

  return (
    <div>
        <Box display="flex" justifyContent="center" mt={5}>
      <Paper elevation={4} style={{ width: "400px", padding: "20px" }}>
        <Typography variant="h5" textAlign="center" mb={3}>Admin Login</Typography>

        <TextField label="Email" name="email" fullWidth sx={{ mb: 3 }} onChange={handleChange} />
        <TextField label="Password" type="password" name="password" fullWidth sx={{ mb: 3 }} onChange={handleChange} />

        <Button fullWidth variant="contained" onClick={handleAdminLogin}>
          Login
        </Button>
      </Paper>
    </Box>
      
    </div>
  )
}
