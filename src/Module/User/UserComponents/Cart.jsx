import React, { useEffect, useState } from "react";
import { Box, Button, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../ContextProvider";
import { useContext } from "react";

export default function Cart() {
  const { host } = useContext(UserContext);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define fetchCart inside useEffect
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const res = await axios.get(`${host}/api/cart/getCart`, {
          headers: { "auth-token": token }
        });
        
        console.log("🛒 FULL CART DATA:", res.data);
        setCartItems(res.data.cartItems || []);
      } catch (err) {
        console.error("Error fetching cart:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
    window.addEventListener("cartUpdated", fetchCart);
    return () => window.removeEventListener("cartUpdated", fetchCart);
  }, [host]); // Only host as dependency

  const removeFromCart = async (cartItemId) => {
    if (!window.confirm("Are you sure you want to remove this item?")) return;

    try {
      const token = localStorage.getItem("userToken");
      await axios.delete(
        `${host}/api/cart/remove/${cartItemId}`,
        { headers: { "auth-token": token } }
      );
      
      alert("Item removed from cart!");
      // Trigger cart update to refresh header count
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to remove item from cart");
    }
  };

  const updateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const token = localStorage.getItem("userToken");
      await axios.put(
        `${host}/api/cart/updateQuantity/${cartItemId}`,
        { quantity: newQuantity },
        { headers: { "auth-token": token } }
      );
      // Trigger cart update to refresh header count
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // ✅ SAFE total calculation
  const totalPrice = cartItems
    .filter(item => item.productId && item.productId.product_price)
    .reduce((total, item) => {
      return total + (item.productId.product_price * item.quantity || 0);
    }, 0);

  if (loading) return <h2>Loading cart...</h2>;

  return (
    <div style={{ padding: "30px" }}>
      <h1>My Cart</h1>
      
      {cartItems.length === 0 ? (
        <h3>Your cart is empty</h3>
      ) : (
        <>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {cartItems.map((cartItem) => {
              const product = cartItem.productId;
              if (!product) return null;

              return (
                <Box 
                  key={cartItem._id}
                  sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    border: "1px solid #ddd", 
                    padding: 2, 
                    borderRadius: 2 
                  }}
                >
                  <img
                    src={product.product_image}
                    alt={product.product_name}
                    style={{ width: "80px", height: "80px", marginRight: "20px", objectFit: 'cover' }}
                  />
                  
                  <Box sx={{ flexGrow: 1 }}>
                    <h3>{product.product_name}</h3>
                    <p>₹{product.product_price?.toFixed(2) || 0}</p>
                    
                    {/* ✅ Quantity controls */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                      <IconButton 
                        size="small" 
                        onClick={() => updateQuantity(cartItem._id, cartItem.quantity - 1)}
                        disabled={cartItem.quantity <= 1}
                        sx={{ 
                          border: "1px solid #ddd",
                          '&:disabled': { opacity: 0.5 }
                        }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      
                      <Box 
                        sx={{ 
                          px: 2, 
                          py: 0.5, 
                          border: "1px solid #ddd", 
                          borderRadius: 1,
                          minWidth: "40px",
                          textAlign: "center"
                        }}
                      >
                        {cartItem.quantity}
                      </Box>
                      
                      <IconButton 
                        size="small" 
                        onClick={() => updateQuantity(cartItem._id, cartItem.quantity + 1)}
                        sx={{ border: "1px solid #ddd" }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                  
                  <div style={{ marginLeft: "auto", textAlign: "right" }}>
                    <strong>₹{(product.product_price * cartItem.quantity || 0).toFixed(2)}</strong>
                    <br />
                    <IconButton 
                      onClick={() => removeFromCart(cartItem._id)}
                      color="error"
                      sx={{ mt: 1 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </Box>
              );
            })}
          </Box>

          <Box sx={{ mt: 4, textAlign: "right" }}>
            <h2>Total: ₹{totalPrice.toFixed(2)}</h2>
            <Button 
              variant="contained" 
              size="large"
              onClick={() => navigate("/Checkout")}
              style={{ backgroundColor: "green", color: "white" }}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </>
      )}
    </div>
  );
}