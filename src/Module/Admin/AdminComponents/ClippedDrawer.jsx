import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const drawerWidth = 250;

export default function StylishDrawer({ children }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenuClick = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userRole");
      navigate("/AdminLogin");
    }
  };

  return (
    <Box sx={{ display: "flex", background: "#f4f6fa" }}>
      <CssBaseline />

      {/* 🟣 Modern AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "linear-gradient(135deg, #5A2AFA 0%, #7B46FF 100%)",
          boxShadow: "0px 2px 12px rgba(0,0,0,0.25)",
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, letterSpacing: 1 }}>
            Admin Panel
          </Typography>

          <IconButton color="inherit" onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* 🟣 Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backdropFilter: "blur(18px)",
            background: "rgba(255, 255, 255, 0.2)",
            borderRight: "1px solid rgba(255,255,255,0.3)",
            boxShadow: "4px 0px 18px rgba(0,0,0,0.1)",
          },
        }}
      >
        <Toolbar />

        <Box sx={{ mt: 3, px: 2 }}>
          <List>

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/Admin/Dashboard"
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  "&:hover": {
                    background: "rgba(90, 42, 250, 0.15)",
                    boxShadow: "0px 3px 8px rgba(90, 42, 250, 0.3)",
                  },
                }}
              >
                <ListItemIcon>
                  <DashboardCustomizeIcon sx={{ color: "#5A2AFA" }} />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/Admin/Viewuser"
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  "&:hover": {
                    background: "rgba(90, 42, 250, 0.15)",
                    boxShadow: "0px 3px 8px rgba(90, 42, 250, 0.3)",
                  },
                }}
              >
                <ListItemIcon>
                  <PeopleIcon sx={{ color: "#7B46FF" }} />
                </ListItemIcon>
                <ListItemText primary="Manage Users" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/Admin/ViewCategoty"
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  "&:hover": {
                    background: "rgba(90, 42, 250, 0.15)",
                    boxShadow: "0px 3px 8px rgba(90, 42, 250, 0.3)",
                  },
                }}
              >
                <ListItemIcon>
                  <CategoryIcon sx={{ color: "#8A5BFF" }} />
                </ListItemIcon>
                <ListItemText primary="Manage Category" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/Admin/ViewProduct"
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  "&:hover": {
                    background: "rgba(90, 42, 250, 0.15)",
                    boxShadow: "0px 3px 8px rgba(90, 42, 250, 0.3)",
                  },
                }}
              >
                <ListItemIcon>
                  <CategoryIcon sx={{ color: "#9C6BFF" }} />
                </ListItemIcon>
                <ListItemText primary="Manage Product" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/Admin/AdminOrderView"
                sx={{
                  borderRadius: 2,
                  "&:hover": {
                    background: "rgba(90, 42, 250, 0.15)",
                    boxShadow: "0px 3px 8px rgba(90, 42, 250, 0.3)",
                  },
                }}
              >
                <ListItemIcon>
                  <LocalShippingIcon sx={{ color: "#B084FF" }} />
                </ListItemIcon>
                <ListItemText primary="Manage Orders" />
              </ListItemButton>
            </ListItem>

          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
