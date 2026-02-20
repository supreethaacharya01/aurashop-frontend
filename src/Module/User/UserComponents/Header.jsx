import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar, Container, Toolbar, IconButton, Typography,
  Box, Avatar, Badge, Button, Menu, MenuItem
} from '@mui/material';
import {
  ShoppingCart, Menu as MenuIcon, Person,
  FavoriteBorder, Close
} from '@mui/icons-material';
import axios from 'axios';
import { UserContext } from '../../../ContextProvider';
import shoplogo from '../../../Assets/shoplogo.jpg';

export default function ModernHeader() {
  const { host } = useContext(UserContext);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch cart count
  useEffect(() => {
    const fetchCartCount = async () => {
      const token = localStorage.getItem('userToken');
      if (!token) return;
      
      try {
        const res = await axios.get(`${host}/api/cart/getCart`, {
          headers: { 'auth-token': token }
        });
        const count = res.data.cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;
        setCartCount(count);
      } catch(err) {
        console.log(err);
      }
    };

    fetchCartCount();
    window.addEventListener("cartUpdated", fetchCartCount);
    return () => window.removeEventListener("cartUpdated", fetchCartCount);
  }, [host]);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleNavigation = (path) => {
    const token = localStorage.getItem("userToken");
    if (!token && path !== '/') {
      localStorage.setItem("redirectAfterLogin", path);
      navigate("/Login");
      return;
    }
    navigate(path);
  };

  const handleSettings = (setting) => {
    if (setting === "My Orders") {
      const token = localStorage.getItem("userToken");
      if (!token) {
        localStorage.setItem("redirectAfterLogin", "/MyOrders");
        navigate("/Login");
        return;
      }
      navigate("/MyOrders");
    } else if (setting === "Login") navigate("/Login");
    else if (setting === "Logout") {
      if (window.confirm("Are you sure you want to logout?")) {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userRole");
        setCartCount(0);
        navigate("/");
      }
    }
    handleCloseUserMenu();
  };

  const token = localStorage.getItem("userToken");
  const userMenuItems = token ? ["My Orders", "Logout"] : ["Login"];

  return (
    <AppBar 
      position="sticky" 
      elevation={scrolled ? 4 : 0}
      sx={{
        backdropFilter: 'blur(20px)',
        backgroundColor: scrolled 
          ? 'rgba(255, 255, 255, 0.95)' 
          : 'rgba(255, 255, 255, 0.8)',
        borderBottom: scrolled ? 'none' : '1px solid rgba(0,0,0,0.08)',
        color: '#333',
        transition: 'all 0.3s ease'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Logo */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
          >
            <Box
              component="img"
              src={shoplogo}
              alt="AuraShop"
              sx={{ 
                height: 45, 
                width: 45,
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: { xs: 'none', sm: 'block' }
              }}
            >
              AuraShop
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {[
              { name: 'Home', path: '/' },
              { name: 'Shop', path: '/Shop' }
            ].map((item) => (
              <Button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  color: '#333',
                  fontWeight: 600,
                  fontSize: '1rem',
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  transition: 'all 0.3s',
                  '&:hover': {
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    color: '#667eea',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>

          {/* Right Side Actions */}
          <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, alignItems: 'center' }}>
            {/* Search - Desktop only */}
           

            {/* Wishlist */}
            <IconButton
              sx={{
                color: '#333',
                '&:hover': { 
                  backgroundColor: 'rgba(102, 126, 234, 0.1)',
                  color: '#667eea'
                }
              }}
            >
              <FavoriteBorder />
            </IconButton>

            {/* Cart */}
            <IconButton
              onClick={() => handleNavigation("/Cart")}
              sx={{
                color: '#333',
                '&:hover': { 
                  backgroundColor: 'rgba(102, 126, 234, 0.1)',
                  color: '#667eea'
                }
              }}
            >
              <Badge 
                badgeContent={cartCount} 
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: '#ff4757',
                    color: 'white',
                    fontWeight: 600
                  }
                }}
              >
                <ShoppingCart />
              </Badge>
            </IconButton>

            {/* User Menu */}
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0.5 }}>
              <Avatar 
                sx={{ 
                  bgcolor: '#667eea',
                  width: 38,
                  height: 38,
                  fontWeight: 600
                }}
              >
                <Person />
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              sx={{
                '& .MuiPaper-root': {
                  borderRadius: 2,
                  mt: 1.5,
                  minWidth: 180,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }
              }}
            >
              {userMenuItems.map((setting) => (
                <MenuItem 
                  key={setting} 
                  onClick={() => handleSettings(setting)}
                  sx={{
                    py: 1.5,
                    '&:hover': { backgroundColor: 'rgba(102, 126, 234, 0.1)' }
                  }}
                >
                  <Typography>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>

            {/* Mobile Menu Toggle */}
            <IconButton
              sx={{ display: { xs: 'flex', md: 'none' } }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <Close /> : <MenuIcon />}
            </IconButton>
          </Box>
        </Toolbar>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <Box
            sx={{
              display: { xs: 'block', md: 'none' },
              pb: 2
            }}
          >
            {[
              { name: 'Home', path: '/' },
              { name: 'Shop', path: '/Shop' }
            ].map((item) => (
              <Button
                key={item.name}
                fullWidth
                onClick={() => {
                  handleNavigation(item.path);
                  setMobileMenuOpen(false);
                }}
                sx={{
                  justifyContent: 'flex-start',
                  color: '#333',
                  py: 1.5,
                  '&:hover': { backgroundColor: 'rgba(102, 126, 234, 0.1)' }
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>
        )}
      </Container>
    </AppBar>
  );
}