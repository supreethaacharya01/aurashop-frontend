import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Toolbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from "../../../ContextProvider";
import { useContext } from "react";

export default function Updateproduct() {
  const {host}=useContext(UserContext);

  const [product, setProduct] = useState({
    pname: '',
    pdesc: '',
    pprice: '',
    pimage: '',
    catid: '',
    pqty: '',
  });

  const [categories, setCategories] = useState([]);
  const { pid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product by ID
    axios
      .get(`${host}/api/product/GetproductById/${pid}`)
      .then((res) => {
        const data = res.data.oneproduct;
        console.log('Fetched product:', data);

        setProduct({
          pname: data.product_name,
          pdesc: data.product_desc,
          pprice: data.product_price,
          pqty: data.product_qty,
          catid: data.categoryId || '',

        });
      })
      .catch((error) => {
        console.log(error);
      });

    // Fetch all categories
    axios
      .get(`${host}/api/category/Getcategory`)
      .then((res) => {
        setCategories(res.data.getcategory);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pid,host]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
     const updatedData = {
    product_name: product.pname,
    product_desc: product.pdesc,
    product_price: product.pprice,
    product_qty: product.pqty,
    categoryId: product.catid
  };
    axios
      .put(`${host}/api/product/Updateproduct/${pid}`,updatedData)
      .then(() => {
        alert('Product Updated Successfully!');
        navigate('/Admin/ViewProduct');
      })
      .catch((error) => {
        console.log(error);
        alert('Update failed!');
      });
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1, p: 1, ml: '150px', mb: '90px' }}>
        <Toolbar />
        <Box display="flex" justifyContent="center">
          <Paper elevation={4} sx={{ width: 600, p: 4 }}>
            <Typography variant="h4" sx={{ mb: 4 }} textAlign="center">
              Update Product
            </Typography>

            <TextField
              label="Product Name"
              name="pname"
              value={product.pname}
              fullWidth
              sx={{ mb: 3 }}
              onChange={handleChange}
            />

            <TextField
              label="Description"
              name="pdesc"
              value={product.pdesc}
              fullWidth
              sx={{ mb: 3 }}
              onChange={handleChange}
            />

            <TextField
              label="Price"
              type="number"
              name="pprice"
              value={product.pprice}
              fullWidth
              sx={{ mb: 3 }}
              onChange={handleChange}
            />

            <TextField
              label="Quantity"
              type="number"
              name="pqty"
              value={product.pqty}
              fullWidth
              sx={{ mb: 3 }}
              onChange={handleChange}
            />

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Category</InputLabel>
              <Select name="catid" value={product.catid} onChange={handleChange}>
                {categories.map((data) => (
                  <MenuItem key={data._id} value={data._id}>
                    {data.category_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Update Product
            </Button>
          </Paper>
        </Box>
      </Box>
    </div>
  );
}
