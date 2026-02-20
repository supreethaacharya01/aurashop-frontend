import React from "react";
import { Box, Typography, Grid, Link , IconButton} from "@mui/material";
import TwitterIcon from '@mui/icons-material/Twitter';
import MailIcon from '@mui/icons-material/Mail';

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#1e3d59",
        color: "#fff",
        mt: 5,
        py: 4,
        px: { xs: 2, sm: 6 },
      }}
    >
      <Grid container spacing={4}>
        {/* --- Brand Section --- */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            AuraShop
          </Typography>
          <Typography variant="body2">
            Your trusted platform for all your shopping needs.  
            Quality products at best prices!
          </Typography>
        </Grid>

        {/* --- Quick Links --- */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            Quick Links
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Link href="/" underline="hover" color="inherit">Home</Link>
            <Link href="/Shop" underline="hover" color="inherit">Shop</Link>
            <Link href="/Contact" underline="hover" color="inherit">Contact</Link>
            <Link href="/About" underline="hover" color="inherit">About Us</Link>
          </Box>
        </Grid>

        {/* --- Contact Section --- */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            Contact Us
          </Typography>

          <Typography variant="body2">📍 Manglore , India</Typography>
          <Typography variant="body2">📞 +91 98765 43210</Typography>
          <Typography variant="body2">📧 support@aurashop.com</Typography>
    
        <Box>
        <IconButton
          color="inherit"
          href="https://twitter.com"
          target="_blank"
          sx={{ mr: 1 }}
        >
          <TwitterIcon />
        </IconButton>

        <IconButton
          color="inherit"
          href="mailto:contact@shop.com"
          sx={{ mr: 1 }}
        >
          <MailIcon />
        </IconButton>
      </Box>
      </Grid>
      </Grid>

      <Box textAlign="center" sx={{ mt: 4, pt: 2, borderTop: "1px solid #ffffff50" }}>
        <Typography variant="body2">
          © 2025 AuraShop — All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
