import React, { useEffect, useState, useCallback, useContext } from "react";
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { UserContext } from "../../../ContextProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Checkout() {
  const { host } = useContext(UserContext);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "" 
  });

  const fetchCart = useCallback(async () => {
    try {
      const token = localStorage.getItem("userToken");
      const res = await axios.get(`${host}/api/cart/getCart`, {
        headers: { "auth-token": token }
      });

      if (!res.data.cartItems || res.data.cartItems.length === 0) {
        alert("Your cart is empty!");
        navigate("/Cart");
      } else {
        setCartItems(res.data.cartItems);
      }
    } catch (err) {
      console.error("Error fetching cart:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, [navigate, host]); // ✅ Added host to dependencies

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleInputChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  // Calculate total price
  const totalAmount = cartItems
    .filter((item) => item.productId && item.productId.product_price)
    .reduce((total, item) => {
      return total + item.productId.product_price * item.quantity;
    }, 0);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (
      !shippingInfo.fullName ||
      !shippingInfo.phone ||
      !shippingInfo.address ||
      !shippingInfo.city ||
      !shippingInfo.pincode ||
      !shippingInfo.paymentMethod
    ) {
      alert("Please fill all shipping details and select payment method!");
      return;
    }

    // For COD, place order directly
    if (shippingInfo.paymentMethod === 'COD') {
      try {
        const token = localStorage.getItem('userToken');
        
        const orderData = {
          shippingInfo,
          totalAmount,
          paymentMethod: shippingInfo.paymentMethod
        };

        const res = await axios.post(
          `${host}/api/order/createOrder`,
          orderData,
          { headers: { "auth-token": token } }
        );
        
        window.dispatchEvent(new Event("cartUpdated"));
        
        if (res.status === 200) {
          alert("Order placed successfully!");
          navigate("/OrderSuccess");
        }
      } catch (error) {
        console.error(error);
        alert("Failed to place order. Please try again.");
      }
    } 
    // For Online, navigate to payment page
    else if (shippingInfo.paymentMethod === 'Online') {
      navigate('/Payment', { 
        state: { 
          shippingInfo,
          totalAmount,
          cartItems 
        } 
      });
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <Box sx={{ p: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Checkout
      </Typography>

      <Grid container spacing={3}>
        {/* Shipping Form */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Shipping Information
            </Typography>

            <form onSubmit={handlePlaceOrder}>
              <TextField
                label="Full Name"
                name="fullName"
                fullWidth
                required
                value={shippingInfo.fullName}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />

              <TextField
                label="Phone Number"
                name="phone"
                type="tel"
                fullWidth
                required
                value={shippingInfo.phone}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />

              <TextField
                label="Address"
                name="address"
                fullWidth
                required
                multiline
                rows={3}
                value={shippingInfo.address}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="City"
                    name="city"
                    fullWidth
                    required
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Pincode"
                    name="pincode"
                    fullWidth
                    required
                    value={shippingInfo.pincode}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Payment Method</InputLabel>
                <Select
                  name="paymentMethod"
                  value={shippingInfo.paymentMethod || ''}
                  onChange={handleInputChange}
                  label="Payment Method"
                  required
                >
                  <MenuItem value=""><em>Select Payment Method</em></MenuItem>
                  <MenuItem value="COD">Cash on Delivery</MenuItem>
                  <MenuItem value="Online">Online Payment</MenuItem>
                </Select>
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  mt: 3,
                  backgroundColor: "#4caf50",
                  "&:hover": { backgroundColor: "#45a049" },
                }}
              >
                Place Order
              </Button>
            </form>
          </Paper>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Order Summary
            </Typography>

            <Box sx={{ maxHeight: 400, overflowY: "auto", mb: 2 }}>
              {cartItems.map((item) => {
                const product = item.productId;
                if (!product) return null;

                return (
                  <Card key={item._id} sx={{ mb: 2 }}>
                    <CardContent sx={{ display: "flex", gap: 2, p: 2 }}>
                      <img
                        src={`${host}/api/image/${product.product_image}`}
                        alt={product.product_name}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body1" fontWeight="bold">
                          {product.product_name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Quantity: {item.quantity}
                        </Typography>
                        <Typography variant="body2" color="primary">
                          ₹{product.product_price} x {item.quantity} = ₹
                          {(product.product_price * item.quantity).toFixed(2)}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                );
              })}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" fontWeight="bold">
                Total Amount:
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="primary">
                ₹{totalAmount.toFixed(2)}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}