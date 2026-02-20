import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  

    const navigate = useNavigate();

  return (
    <div>
        <Box 
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        p: 3
      }}
    >
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
        🎉 Order Placed Successfully!
      </Typography>

      <Typography variant="h6" sx={{ mb: 3 }}>
        Thank you for your purchase.
      </Typography>

      <Button
        variant="contained"
        sx={{ backgroundColor: "#4caf50" }}
        onClick={() => navigate("/")}
      >
        Go to Home
      </Button>
    </Box>
      
    </div>
  )
}
