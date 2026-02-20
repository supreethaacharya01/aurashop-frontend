import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { Box, Toolbar, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from "../../../ContextProvider";
import { useContext } from "react";

export default function ViewProduct() {
    const { host } = useContext(UserContext);
    const navigate = useNavigate();

    const imageStyle = {
        width: "80px",
        height: "120px",
        objectFit: "cover",
        borderRadius: "6px"
    };

    const [allproduct, setAllproduct] = useState([]);

    useEffect(() => {
        // Define fetchproduct inside useEffect
        const fetchproduct = async () => {
            try {
                const response = await axios.get(`${host}/api/product/Getproduct`)
                setAllproduct(response.data.getproduct)
                console.log("All product", response.data.getproduct)
            } catch (error) {
                console.log(error)
            }
        }

        fetchproduct();
    }, [host]) // Only host as dependency

    const handleViewProduct = () => {
        navigate('/Admin/AddProduct');
    };

    const handleDelete = (pid) => {
        console.log("Product id" + pid)
        axios.delete(`${host}/api/product/Deleteproduct/${pid}`)
            .then(() => {
                alert("Product deleted")
                // Refresh the product list
                const fetchproduct = async () => {
                    try {
                        const response = await axios.get(`${host}/api/product/Getproduct`)
                        setAllproduct(response.data.getproduct)
                    } catch (error) {
                        console.log(error)
                    }
                }
                fetchproduct();
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <Box sx={{ flexGrow: 2, p: 1, ml: '40px', mb: '80px' }}>
                <Toolbar />
                <Box display="flex" justifyContent="flex-end" mb={1}>
                    <Button
                        variant='contained'
                        onClick={handleViewProduct}
                        color="info"
                        sx={{ mb: 1 }}
                    >
                        Add Product
                    </Button>
                </Box>

                <TableContainer sx={{ ml: '125px', mt: 2 }}>
                    <Typography variant='h4' sx={{ mb: 3, textAlign: 'center' }}> View Product</Typography>
                    <Table sx={{ width: "80%", mx: "auto" }}>

                        <TableHead>
                            <TableRow style={{ backgroundColor: '#fbc02d', }} >
                                <TableCell align="right" style={{ fontSize: "18px", fontWeight: "bold" }}>Sl .No</TableCell>
                                <TableCell align="right" style={{ fontSize: "18px", fontWeight: "bold" }}>Product Name</TableCell>
                                <TableCell align="right" style={{ fontSize: "18px", fontWeight: "bold" }}>Product Image</TableCell>
                                <TableCell align="right" style={{ fontSize: "18px", fontWeight: "bold" }}>Description</TableCell>
                                <TableCell align="right" style={{ fontSize: "18px", fontWeight: "bold" }}>Category</TableCell>
                                <TableCell align="right" style={{ fontSize: "18px", fontWeight: "bold" }}>Product quantity</TableCell>
                                <TableCell align="right" style={{ fontSize: "18px", fontWeight: "bold" }}>Product price</TableCell>
                                <TableCell align="right" style={{ fontSize: "18px", fontWeight: "bold" }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {allproduct.map((productdata, index) => (
                                <TableRow style={{ backgroundColor: '#fffde7' }}>
                                    <TableCell align="right" > {index + 1} </TableCell>
                                    <TableCell align="right">{productdata.product_name}</TableCell>
                                    <TableCell align="right">
                                        <img src={`${host}/api/image/${productdata.product_image}`} alt="product"
                                            style={imageStyle} />
                                    </TableCell>

                                    <TableCell align="right">{productdata.product_desc}</TableCell>
                                    <TableCell align="right">{productdata.category_name}</TableCell>
                                    <TableCell align="right">{productdata.product_qty}</TableCell>
                                    <TableCell align="right">{productdata.product_price}</TableCell>

                                    <TableCell align="right">
                                        <Button variant='contained' color='success' component={Link} to={`/Admin/Updateproduct/${productdata._id}`} ><EditIcon />Update</Button>
                                        <Button variant='contained' color='error' onClick={() => handleDelete(productdata._id)}><DeleteIcon />Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    )
}