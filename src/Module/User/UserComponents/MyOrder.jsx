import React, { useEffect, useState , useCallback} from "react";
import { Box, Card, CardContent, Typography, Chip } from "@mui/material";
import axios from "axios";
import { UserContext } from "../../../ContextProvider";
import { useContext } from "react";

export default function MyOrders() {
  const {host}=useContext(UserContext);
  const [orders, setOrders] = useState([]);

   // Define fetchOrders with useCallback FIRST, before useEffect
  const fetchOrders = useCallback(async () => {
    try {
      const token = localStorage.getItem("userToken");
      const res = await axios.get(`${host}/api/order/myOrders`, {
        headers: { "auth-token": token }
      });
      setOrders(res.data.orders || []);
    } catch (error) {
      console.error(error);
    }
  }, [host]); // Add host as dependency

  // Now useEffect can use fetchOrders
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);


  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>My Orders</Typography>

      {orders.length === 0 ? (
        <Typography>No orders yet</Typography>
      ) : (
        orders.map((order) => (
          <Card key={order._id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">Order ID: {order._id}</Typography>
              <Typography>Total: ₹{order.totalAmount}</Typography>
              <Typography>Date: {new Date(order.orderDate).toLocaleDateString()}</Typography>
              <Chip 
                label={order.orderStatus} 
                color={order.orderStatus === 'Delivered' ? 'success' : 'warning'}
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}