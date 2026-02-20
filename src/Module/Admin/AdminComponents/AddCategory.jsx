import {Box , Paper, TextField,Typography, Button, Toolbar} from '@mui/material'
import React from 'react'
import { UserContext } from "../../../ContextProvider";
import { useContext } from "react";

import { useState } from 'react';
import axios from 'axios';

export default function AddCategory() {
  
 const {host}=useContext(UserContext);
   
     const [category, setCategory]=useState({
            cname:"",
            cdescription:""
        });

         // to handle updateas in state
    const handleChange=(e)=>{
      setCategory({ ...category, [e.target.name]: e.target.value });
       console.log({[e.target.name]:e.target.value});

    }

    const handleSubmit=()=>{
        console.log(category)
        axios.post(`${host}/api/category/Addcategory`, category)
        .then((res)=>{
            console.log("Category details",res.data)
            alert("Category listed successfully")

        })
        .catch((err)=>{
console.log(err)
alert("server error")
        })
    
    }
  return (
    <div>
      <Box sx={{ flexGrow: 1, p:1, ml: '150px',  mb:'90px'}}>
      {/* Add Toolbar to prevent content being hidden behind AppBar */}
      <Toolbar />
      
       <Box display="flex" justifyContent="center" >
            <Paper elevation={4} sx={{ width: 600, p: 4 }}>
            <Typography variant='h4' sx={{mb:4}} textAlign={'center'}>Category List </Typography>
            <TextField variant='outlined' label=' Category Name' type='text' name='cname' value={category.cname} fullWidth   sx={{mb:4}} onChange={handleChange}/>
            <TextField variant='outlined' label='Category Description ' type='text' name='cdescription' value={category.cdescription} fullWidth  sx={{mb:3}} onChange={handleChange}/>
            
            <Button variant='contained' onClick={handleSubmit} color="success">Add Category</Button> 
           
      
            </Paper>
        </Box>
        </Box>
    </div>
  )
}
