import React, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box,Toolbar, Button,  Paper, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { UserContext } from "../../../ContextProvider";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const {host}=useContext(UserContext);
const navigate=useNavigate()
    const [product , setProduct]=useState({
       pname:'',
       pdesc:'',
       pprice:'',
       pimage:'',
       catid:'',
       pqty:'' 
    })
   

    const [categories, setcategories]=useState([]);
    
    useEffect(()=>{
       axios.get(`${host}/api/category/Getcategory`)
      .then((res) => {
        console.log("Fetched categories:", res.data.getcategory);
        setcategories(res.data.getcategory);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [host]);

    

 const handleChange=(e)=>{
  if(e.target.name ==='pimage'){
    setProduct({...product, pimage:e.target.files[0]});
  }else{
      setProduct({ ...product, [e.target.name]: e.target.value });
      console.log({[e.target.name]:e.target.value});
     }
    }

    // const handleChange=(e)=>{
    //   setProduct({ ...product, [e.target.name]: e.target.value });
    //    console.log({[e.target.name]:e.target.value});
    // }
    const handleSubmit=()=>{
        console.log(product);
        
        const data=new FormData();

      data.append('pname', product.pname);
    data.append('pdesc', product.pdesc);
    data.append('pprice', product.pprice);
    data.append('pqty', product.pqty);
    data.append('catid', product.catid);
    data.append('pimage', product.pimage);

        axios.post(`${host}/api/product/AddProduct`, data, 
          {headers:{'content-Type':'multipart/form-data'}})
        .then((res)=>{
            console.log("Product added",res.data)
            alert("Product added successfully")
           navigate('/Admin/ViewProduct') 
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
      
     <Box style={{display:"flex" , justifyContent:"center", margin:"30px" }}>
        <Paper elevation={4} style={{width:"600px" ,padding:"20px"}}>
           
            <Typography variant='h4' textAlign="center" sx={{mb:4 , fontFamily:'fantasy', color:"darkslategray"}}>Add Product</Typography>
            <TextField variant='outlined' label='Product Name' type='text' name='pname' value={product.pname} fullWidth   sx={{mb:4}} onChange={handleChange}/>
            <TextField variant='outlined' label='Product Description' type='text' name='pdesc' value={product.pdesc} fullWidth  sx={{mb:3}} onChange={handleChange}/>
            <TextField variant='outlined' label='Product Price' type='number' name='pprice' value={product.pprice} fullWidth  sx={{mb:3}} onChange={handleChange}/>
            <TextField variant='outlined'  label='Product image' InputLabelProps={{shrink:true}} type='file' name='pimage' fullWidth  sx={{mb:3}} onChange={handleChange}/>
            <TextField variant='outlined' label='Quantity' type='number' name='pqty'value={product.pqty} fullWidth  sx={{mb:3}} onChange={handleChange}/>
             <FormControl sx={{minWidth: 560 }}>
            <InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
            <Select
                 labelId="demo-simple-select-autowidth-label"
                 id="demo-simple-select-autowidth"
                value={product.catid}
                name='catid'
                onChange={handleChange}
                autoWidth
                label="Category">
          {categories.map((catdata)=>(
           
                <MenuItem key={catdata._id}  value={catdata._id}>{catdata.category_name}</MenuItem>
            
           ))}
        </Select>
      </FormControl>
        <Button variant='contained'  color='primary' style={{marginLeft:"200px"}} onClick={handleSubmit}>Add Product</Button>
          
        </Paper>
      </Box>
      </Box>
    </div>
  )
}
