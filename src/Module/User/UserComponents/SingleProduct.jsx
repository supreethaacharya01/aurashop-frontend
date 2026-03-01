import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../../ContextProvider";
import { useContext } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  Stack
} from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function SingleProduct() {
 const navigate = useNavigate();
 
 const {host}=useContext(UserContext);
  const { id } = useParams();   // product ID from URL
  const [product, setProduct] = useState(null);
  
  // Fetch single product
 useEffect(() => {
  axios
    .get(`${host}/api/product/GetproductById/${id}`) // use route path
    .then((res) => setProduct(res.data.oneproduct)) // access `oneproduct`
    .catch((err) => console.log(err));
}, [id, host]);


  // Add to cart function
const addToCart = () => {
  if (!product) return;
  const token = localStorage.getItem("userToken");

  axios.post(
    `${host}/api/cart/addToCart`,
    {
      productId: product._id,
      quantity: 1
    },
    { headers: { "auth-token": token } }
  )
  .then(res => {
    alert("Product added to cart!");
    window.dispatchEvent(new Event("cartUpdated"));
  })
  .catch(err => {
    console.error(err.response?.data || err.message);
    alert("Failed to add product to cart");
  });
};
const buyNow = async () => {
  const token = localStorage.getItem("userToken");

  if (!token) {
    alert("Please login first");
    navigate("/login");
    return;
  }

  try {
    await axios.post(
      `${host}/api/cart/addToCart`,
      {
        productId: product._id,
        quantity: 1
      },
      { headers: { "auth-token": token } }
    );

    window.dispatchEvent(new Event("cartUpdated"));
    navigate("/checkout");   // 👈 GO TO CHECKOUT
  } catch (err) {
    alert("Failed to process Buy Now");
  }
};


  if (!product) return <h2>Loading...</h2>;

 return (
  <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
    <Card elevation={3} sx={{ p: 3 }}>
      <Grid container spacing={4}>
        
        {/* LEFT – PRODUCT IMAGE */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              border: "1px solid #eee",
              borderRadius: 2,
              p: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%"
            }}
          >
            <img
              src={product.product_image}
              alt={product.product_name}
              style={{
                width: "100%",
                maxHeight: "400px",
                objectFit: "contain"
              }}
            />
          </Box>
        </Grid>

        {/* RIGHT – PRODUCT DETAILS */}
        <Grid item xs={12} md={7}>
          <CardContent>
            <Stack spacing={2}>
              
              <Typography variant="h4" fontWeight="bold">
                {product.product_name}
              </Typography>

              <Typography variant="h5" color="primary">
                ₹ {product.product_price}
              </Typography>

              <Typography variant="body1" color="text.secondary">
                {product.product_desc}
              </Typography>

              <Divider />

              <Typography variant="body2">
                <strong>Available Stock:</strong> {product.product_qty}
              </Typography>

              {/* ACTION BUTTONS */}
              <Stack direction="row" spacing={2} mt={2}>
                <Button
                  variant="contained"
                  size="large"
                  color="success"
                  onClick={addToCart}
                >
                  Add to Cart
                </Button>

                <Button
  variant="outlined"
  size="large"
  color="primary"
  onClick={buyNow}
>
  Buy Now
</Button>

              </Stack>

            </Stack>
          </CardContent>
        </Grid>

      </Grid>
    </Card>
  </Container>
);
}
