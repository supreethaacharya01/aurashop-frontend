import React, { useState, useEffect } from 'react';
import { Box, Paper, TextField, Typography, Button, Toolbar } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from "../../../ContextProvider";
import { useContext } from "react";

export default function UpdateCategory() {
  const {host}=useContext(UserContext);

  const [category, setCategory] = useState({
    cname: "",
    cdescription: ""
  });

  const { cid } = useParams();
  console.log("Category ID:", cid);

  // handle input changes
  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
    console.log({ [e.target.name]: e.target.value });
  };

  // fetch category by ID
  useEffect(() => {
    axios.get(`${host}/api/category/GetcategoryById/${cid}`)
      .then((res) => {
        const cat = res.data.onecategory;
     console.log(res.data.onecategory) ;

        setCategory({
          cname: cat.category_name,
          cdescription: cat.category_description
        });
      })
      
      .catch((error) => {
        console.log(error);
      });
  }, [cid, host]);
const nav = useNavigate();

  // update category
  const handleUpdate = () => {
    const Updatedcategory = {
       category_name :category.cname,
       category_description:category.cdescription
    }
    axios.put(`${host}/api/category/Updatecategory/${cid}`, Updatedcategory)
      .then(() => {
        alert("Category Updated Successfully");
      nav("/Admin/ViewCategoty")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1, p: 1, ml: '150px', mb: '90px' }}>
        <Toolbar />
        <Box display="flex" justifyContent="center">
          <Paper elevation={4} sx={{ width: 600, p: 4 }}>
            <Typography variant="h4" sx={{ mb: 4 }} textAlign="center">
              Update Category
            </Typography>
            <TextField
              variant="outlined"
              label="Category Name"
              type="text"
              name="cname"
              value={category.cname}
              fullWidth
              sx={{ mb: 4 }}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              label="Category Description"
              type="text"
              name="cdescription"
              value={category.cdescription}
              fullWidth
              sx={{ mb: 3 }}
              onChange={handleChange}
            />

            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Update Category
            </Button>
          </Paper>
        </Box>
      </Box>
    </div>
  );
}
