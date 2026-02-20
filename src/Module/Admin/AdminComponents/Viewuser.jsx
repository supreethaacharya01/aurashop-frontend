import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserContext } from "../../../ContextProvider";
import { useContext } from "react";

export default function Viewuser() {
   const { host } = useContext(UserContext);
   const [allusers, setAllusers] = useState([]);

   useEffect(() => {
      // Define fetchusers inside useEffect
      const fetchusers = async () => {
         try {
            const response = await axios.get(`${host}/api/user/Getuser`)
            setAllusers(response.data.getusers)
            console.log("All users", response.data.getusers)
         } catch (error) {
            console.log(error)
         }
      }

      fetchusers();
   }, [host]) // Only host as dependency

   const handleDelete = (uid) => {
      console.log("user id" + uid)
      axios.delete(`${host}/api/user/Deleteusers/${uid}`)
         .then(() => {
            alert("User deleted")
            // Refresh the user list
            const fetchusers = async () => {
               try {
                  const response = await axios.get(`${host}/api/user/Getuser`)
                  setAllusers(response.data.getusers)
               } catch (error) {
                  console.log(error)
               }
            }
            fetchusers();
         })
         .catch((err) => {
            console.log(err)
         })
   }

   return (
      <div>
         <TableContainer sx={{ ml: '125px', mt: 2 }}>
            <Typography variant='h4' sx={{ mb: 3, textAlign: 'center' }}>View Users</Typography>
            <Table sx={{ width: "80%", mx: "auto" }}>

               <TableHead>
                  <TableRow style={{ backgroundColor: '#2ea5ebff' }} >
                     <TableCell align="right" style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>Sl.No</TableCell>
                     <TableCell align="right" style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>Name</TableCell>
                     <TableCell align="right" style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>Email</TableCell>
                     <TableCell align="right" style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>Phone</TableCell>
                     <TableCell align="right" style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>Address</TableCell>
                     <TableCell align="right" style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>Action</TableCell>
                  </TableRow>
               </TableHead>

               <TableBody>
                  {allusers.map((userdata, index) => (
                     <TableRow style={{ backgroundColor: '#e8e7ddff' }}>
                        <TableCell align="right" > {index + 1} </TableCell>
                        <TableCell align="right">{userdata.name}</TableCell>
                        <TableCell align="right">{userdata.email}</TableCell>
                        <TableCell align="right">{userdata.phone}</TableCell>
                        <TableCell align="right">{userdata.address}</TableCell>
                        <TableCell align="right" ><Button variant='contained' color='error' onClick={() => handleDelete(userdata._id)}><DeleteIcon /> Delete</Button></TableCell>
                     </TableRow>
                  ))}

               </TableBody>

            </Table>
         </TableContainer>
      </div>
   )
}