import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { Box, Button, Toolbar, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from "../../../ContextProvider";
import { useContext } from "react";

export default function ViewCategoty() {
    const { host } = useContext(UserContext);
    const navigate = useNavigate();

    const [allcategory, setAllcategory] = useState([]);

    useEffect(() => {
        // Define fetchcategory inside useEffect
        const fetchcategory = async () => {
            try {
                const response = await axios.get(`${host}/api/category/Getcategory`)
                setAllcategory(response.data.getcategory)
                console.log("All category", response.data.getcategory)
            } catch (error) {
                console.log(error)
            }
        }

        fetchcategory();
    }, [host]) // Only host as dependency

    const handleViewCategory = () => {
        navigate('/Admin/AddCategory');
    };

    const handleDelete = (cid) => {
        console.log("category id" + cid)
        axios.delete(`${host}/api/category/Deletecategory/${cid}`)
            .then(() => {
                alert("category deleted")
                // Refresh the category list
                const fetchcategory = async () => {
                    try {
                        const response = await axios.get(`${host}/api/category/Getcategory`)
                        setAllcategory(response.data.getcategory)
                    } catch (error) {
                        console.log(error)
                    }
                }
                fetchcategory();
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <Box sx={{ flexGrow: 2, p: 1, ml: '40px', mb: '80px' }}>
                <Toolbar />

                <Box display="flex" justifyContent="flex-end" mb={2}>
                    <Button
                        variant='contained'
                        onClick={handleViewCategory}
                        color="info"
                        sx={{ mb: 3 }}
                    >
                        Add Category
                    </Button>
                </Box>

                <TableContainer sx={{ ml: '125px', mt: 2 }}>
                    <Typography variant='h4' sx={{ mb: 3, textAlign: 'center' }}> View Category</Typography>

                    <Table sx={{ width: "80%", mx: "auto" }}>

                        <TableHead>
                            <TableRow style={{ backgroundColor: '#fbc02d', }} >
                                <TableCell align="right" style={{ fontSize: "18px", fontWeight: "bold" }}>Sl.No</TableCell>
                                <TableCell align="right" style={{ fontSize: "18px", fontWeight: "bold" }}>Category Name</TableCell>
                                <TableCell align="right" style={{ fontSize: "18px", fontWeight: "bold" }}>Category Description</TableCell>
                                <TableCell align="right" style={{ fontSize: "18px", fontWeight: "bold" }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {allcategory.map((categorydata, index) => (
                                <TableRow style={{ backgroundColor: '#fffde7' }}>
                                    <TableCell align="right" > {index + 1} </TableCell>
                                    <TableCell align="right">{categorydata.category_name}</TableCell>
                                    <TableCell align="right">{categorydata.category_description}</TableCell>
                                    <TableCell align="right">
                                        <Button variant='contained' color='success' component={Link} to={`/Admin/Updatecategory/${categorydata._id}`} ><EditIcon />Update</Button>
                                        <Button variant='contained' color='error' onClick={() => handleDelete(categorydata._id)}><DeleteIcon />Delete</Button>
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