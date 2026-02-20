import React from 'react'
import { useState } from 'react'
import { Box,Paper,TextField, Typography,Button} from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';
import { UserContext } from "../../../ContextProvider";
import { useContext } from "react";

export default function ManageProfile() {

    const {host}=useContext(UserContext);

    const [profile ,setProfile]=useState({
        uname:"",
        uemail:"",
        uphone:"",
        uaddress:""
    });

    const handleChange=(e)=>{
        setProfile({ ...profile, [e.target.name]: e.target.value });
       console.log({[e.target.name]:e.target.value});
    }

    useEffect(()=>{
        const token=(localStorage.getItem('userToken'))
        console.log("userToken", token)
        if(token){
            axios.get(`${host}/api/user/GetProfile`,{headers:{"auth-token" :token}})
            .then((res)=>{
            // setProfile(res.data.user)
            // console.log(res.data.user)
            const userdata=res.data.user;

            setProfile({
        uname:userdata.name,
        uemail:userdata.email,
        uphone:userdata.phone,
        uaddress:userdata.address
            })
        })
        .catch((error)=>{
            console.log(error)
        })
        }

        else{
            alert("token not found")
        }  
    }, [host])

    const handleProfileUpdate=()=>{
        const token=localStorage.getItem('userToken')
         axios.put(`${host}/api/user/UpdateProfile`, profile, {headers:{"auth-token" :token}})
         .then((res)=>{
            alert(res.data.message)
            setProfile(res.data.users)
         })
         .catch((error)=>{
            console.log(error)
            alert(error.message)
         })
    }

  return (
    <div>
      <Box style={{display:"flex" , justifyContent:"center", margin:"30px"}}>
        <Paper elevation={4} style={{width:"600px" ,padding:"20px"}}>
           
            <Typography variant='h4' textAlign="center" sx={{mb:4}}>Manage Profile </Typography>
            <TextField variant='outlined' label='Name' type='text' name='uname' value={profile.uname} fullWidth   sx={{mb:4}} onChange={handleChange}/>
            <TextField variant='outlined' label='Email' type='text' name='uemail' value={profile.uemail} fullWidth  sx={{mb:3}} onChange={handleChange}/>
           
            <TextField variant='outlined' label='Phone' type='number' name='uphone' value={profile.uphone} fullWidth  sx={{mb:3}} onChange={handleChange}/>
            <TextField variant='outlined' label='Address' type='text' name='uaddress'value={profile.uaddress}fullWidth  sx={{mb:3}} onChange={handleChange}/>
            <Button variant='contained' sx={{ml:24}} color='error' onClick={handleProfileUpdate}> Update Profile</Button>
          
        </Paper>
      </Box>
    </div>
  )
}
