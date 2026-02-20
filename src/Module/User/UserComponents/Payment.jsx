import React, { useState } from 'react';
import {
  Box, Paper, Typography, Button, Radio, RadioGroup,
  FormControlLabel, FormControl
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import QRCode from 'react-qr-code';
import axios from 'axios';
import { UserContext } from "../../../ContextProvider";
import { useContext } from "react";

export default function Payment() {
   const {host}=useContext(UserContext);

  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
    console.log("Payment page location.state:", location.state);

  const { shippingInfo, totalAmount } = location.state || {};
  const orderTotal = totalAmount || 0;

   console.log("Shipping Info:", shippingInfo);
  console.log("Order Total:", orderTotal);
  
  const handlePayment = async () => {
    if (paymentMethod === 'COD') {
      // For COD, place order directly
      await placeOrder('COD');
    } else {
      // For online, show payment screen then place order
      setProcessing(true);
      
      // Simulate payment processing
      setTimeout(async () => {
        await placeOrder('Online');
        setProcessing(false);
      }, 3000);
    }
  };

  const placeOrder = async (method) => {
    try {
      const token = localStorage.getItem('userToken');
      
      const orderData = {
        shippingInfo: {
          ...shippingInfo,
          paymentMethod: method
        },
        totalAmount: orderTotal,
        paymentMethod: method
      };

      const res = await axios.post(
        `${host}/api/order/createOrder`,
        orderData,
        { headers: { "auth-token": token } }
      );
      
      window.dispatchEvent(new Event("cartUpdated"));
      
      if (res.status === 200) {
        alert(`Order placed successfully! Payment method: ${method}`);
        navigate('/OrderSuccess');
      }
    } catch (error) {
      console.error('Order error:', error);
      alert('Failed to place order. Please try again.');
      setProcessing(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        Complete Your Payment
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Order Total: ₹{orderTotal.toFixed(2)}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Shipping to: {shippingInfo?.fullName || 'N/A'}
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Select Payment Method
        </Typography>
        
        <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
          <RadioGroup
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel
              value="COD"
              control={<Radio />}
              label={
                <Box>
                  <Typography fontWeight="bold">Cash on Delivery</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Pay when you receive your order
                  </Typography>
                </Box>
              }
            />
            
            <FormControlLabel
              value="Online"
              control={<Radio />}
              label={
                <Box>
                  <Typography fontWeight="bold">Online Payment</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Pay now using UPI, Card, or Net Banking
                  </Typography>
                </Box>
              }
            />
          </RadioGroup>
        </FormControl>

        {paymentMethod === 'Online' && (
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="subtitle1" gutterBottom>
              Scan QR Code to Pay
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
              <QRCode 
                value={`upi://pay?pa=demo@upi&pn=AuraShop&am=${orderTotal}&tn=OrderPayment`}
                size={200}
              />
            </Box>
            <Typography variant="body2" color="textSecondary" align="center">
              Scan with any UPI app or use demo card: 4111 1111 1111 1111
            </Typography>
            
            <Box sx={{ mt: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant="caption" color="textSecondary">
                <strong>Demo Mode:</strong> No real payment will be processed. 
                Click "Pay Now" to simulate payment.
              </Typography>
            </Box>
          </Box>
        )}
      </Paper>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          disabled={processing}
          fullWidth
        >
          Back
        </Button>
        
        <Button
          variant="contained"
          onClick={handlePayment}
          disabled={processing}
          fullWidth
          color={paymentMethod === 'Online' ? 'success' : 'primary'}
        >
          {processing ? 'Processing...' : 
           paymentMethod === 'Online' ? 'Pay Now' : 'Place Order (COD)'}
        </Button>
      </Box>
    </Box>
  );
}