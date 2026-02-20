import React, { useEffect, useState } from 'react';
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography, 
  Select, MenuItem, FormControl, Chip, Button
} from '@mui/material';
import axios from 'axios';
import { UserContext } from "../../../ContextProvider";
import { useContext } from "react";

export default function AdminOrderView() {
  const { host } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Define fetchOrders inside useEffect
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const res = await axios.get(`${host}/api/order/allOrders`, {
          headers: { 'auth-token': token }
        });
        setOrders(res.data.orders || []);
        console.log('Orders:', res.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        alert('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [host]); // Only host as dependency

  // Update order status
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('userToken');
      await axios.put(
        `${host}/api/order/updateOrder/${orderId}`,
        { orderStatus: newStatus },
        { headers: { 'auth-token': token } }
      );

      alert('Order status updated successfully!');
      // Refresh orders after update
      const fetchOrders = async () => {
        try {
          const token = localStorage.getItem('userToken');
          const res = await axios.get(`${host}/api/order/allOrders`, {
            headers: { 'auth-token': token }
          });
          setOrders(res.data.orders || []);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };
      fetchOrders();
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order status');
    }
  };


  // View items in a modal or expandable row
  const handleViewItems = (items) => {
    let message = "Order Items:\n\n";
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.productName} - Qty: ${item.quantity} - Price: ₹${item.productPrice} - Total: ₹${item.totalPrice}\n`;
    });
    alert(message);
  };

  if (loading) {
    return (
      <Box sx={{ ml: '125px', mt: 2, textAlign: 'center' }}>
        <Typography variant="h6">Loading orders...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 1, ml: '150px', mb: '90px' }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
        All Orders
      </Typography>

      <TableContainer component={Paper} sx={{ ml: '60px', mt: 1, maxHeight: 600, overflow: 'auto' }}>
        <Table stickyHeader sx={{ width: '95%', mx: 'auto' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#2ea5eb', color: 'white', fontWeight: 'bold' }}>
                Order ID
              </TableCell>
              <TableCell sx={{ backgroundColor: '#2ea5eb', color: 'white', fontWeight: 'bold' }}>
                Customer
              </TableCell>
              <TableCell sx={{ backgroundColor: '#2ea5eb', color: 'white', fontWeight: 'bold' }}>
                Items
              </TableCell>
              <TableCell sx={{ backgroundColor: '#2ea5eb', color: 'white', fontWeight: 'bold' }}>
                Total Amount
              </TableCell>
              <TableCell sx={{ backgroundColor: '#2ea5eb', color: 'white', fontWeight: 'bold' }}>
                Status
              </TableCell>
              <TableCell sx={{ backgroundColor: '#2ea5eb', color: 'white', fontWeight: 'bold' }}>
                Payment
              </TableCell>
              <TableCell sx={{ backgroundColor: '#2ea5eb', color: 'white', fontWeight: 'bold' }}>
                Order Date
              </TableCell>
              
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h6" color="textSecondary">
                    No orders found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order._id} sx={{ backgroundColor: '#f9f9f9' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>
                    #{order._id.slice(-8).toUpperCase()}
                  </TableCell>

                  <TableCell>
                    <strong>{order.userId?.name || 'Guest'}</strong><br />
                    <small>{order.userId?.email || 'N/A'}</small><br />
                    <small>{order.shippingInfo?.phone || ''}</small>
                  </TableCell>

                  <TableCell>
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => handleViewItems(order.items)}
                      sx={{ mb: 1 }}
                    >
                      View {order.items?.length || 0} items
                    </Button>
                    <div style={{ fontSize: '0.8rem' }}>
                      {order.items?.slice(0, 2).map((item, idx) => (
                        <div key={idx}>
                          • {item.productName} (Qty: {item.quantity})
                        </div>
                      ))}
                      {order.items?.length > 2 && <div>...</div>}
                    </div>
                  </TableCell>

                  <TableCell>
                    <Typography variant="h6" color="primary">
                      ₹{order.totalAmount?.toFixed(2) || 0}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <Select
                        value={order.orderStatus || 'Pending'}
                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                        size="small"
                      >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Processing">Processing</MenuItem>
                        <MenuItem value="Shipped">Shipped</MenuItem>
                        <MenuItem value="Delivered">Delivered</MenuItem>
                        <MenuItem value="Cancelled">Cancelled</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={order.paymentStatus || 'Pending'}
                      color={
                        order.paymentStatus === 'Paid' ? 'success' :
                        order.paymentStatus === 'Failed' ? 'error' : 'warning'
                      }
                      size="small"
                    />
                    <div style={{ fontSize: '0.75rem', marginTop: '4px' }}>
                      {order.shippingInfo?.paymentMethod || 'COD'}
                    </div>
                  </TableCell>

                  <TableCell>
                    {new Date(order.orderDate).toLocaleDateString()}<br />
                    <small>{new Date(order.orderDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</small>
                  </TableCell>

                  
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}