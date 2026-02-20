import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from "../../../ContextProvider";
import { useContext } from "react";

export default function Dashboard() {
   const {host}=useContext(UserContext);
  const [stats, setStats] = useState({
    users: 0,
    categories: 0,
    products: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch users count
    axios.get(`${host}/api/user/Getuser`)
      .then(res => {
        setStats(prev => ({ ...prev, users: res.data.getusers.length }));
      })
      .catch(console.error);

    // Fetch categories count
    axios.get(`${host}/api/category/Getcategory`)
      .then(res => {
        setStats(prev => ({ ...prev, categories: res.data.getcategory.length }));
      })
      .catch(console.error);

    // Fetch products count
    axios.get(`${host}/api/product/Getproduct`)
      .then(res => {
        setStats(prev => ({ ...prev, products: res.data.getproduct.length }));
      })
      .catch(console.error);
  }, [host]);

  return (
    <Box sx={{ ml: '200px', mt: 10, mr: 4 }}>
      <Typography variant="h4" gutterBottom  sx={{textAlign:'center'}}>
        Admin Dashboard
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {/* User Stats */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>Users</Typography>
            <Typography variant="h2" sx={{ color: 'primary.main', mb: 2 }}>{stats.users}</Typography>
           <Typography sx={{ 
        color: '#4caf50', 
        fontSize: '16px',
        fontWeight: 500 ,
        
      }}>Registered Users</Typography>
          </Paper>
        </Grid>

        {/* Category Stats */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>Categories</Typography>
            <Typography variant="h2" sx={{ color: 'secondary.main', mb: 2 }}>{stats.categories}</Typography>
           <Typography sx={{ 
        color: '#4caf50', 
        fontSize: '16px',
        fontWeight: 500 ,
        
      }}>Available Categories</Typography>
          </Paper>
        </Grid>

        {/* Product Stats */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>Products</Typography>
            <Typography variant="h2" sx={{ color: 'success.main', mb: 2 }}>{stats.products}</Typography>
           <Typography 
      sx={{ 
        color: '#4caf50', 
        fontSize: '16px',
        fontWeight: 500 ,
        
      }}
    >
      Available Products
    </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
