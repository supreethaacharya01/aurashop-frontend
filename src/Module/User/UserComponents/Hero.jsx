import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { ArrowForward, LocalShipping, Security, ThumbUp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import homePage from '../../../Assets/home1.png'

export default function ModernHero() {
  const navigate = useNavigate();

  return (
    <>
      {/* Main Hero Section */}
      <Box
        sx={{
          minHeight: '85vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          py: { xs: 6, md: 0 }
        }}
      >
        {/* Animated Background Elements */}
        <Box
          sx={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            top: '-200px',
            right: '-150px',
            animation: 'float 6s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-30px)' }
            }
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            bottom: '-150px',
            left: '-100px',
            animation: 'float 8s ease-in-out infinite',
            animationDelay: '1s'
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              {/* Hero Text */}
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                  fontWeight: 900,
                  color: 'white',
                  mb: 2,
                  textShadow: '2px 2px 8px rgba(0,0,0,0.2)',
                  lineHeight: 1.2
                }}
              >
                Discover Your
                <br />
                Perfect Style
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  color: 'rgba(255,255,255,0.95)',
                  mb: 4,
                  fontSize: { xs: '1.1rem', sm: '1.3rem' },
                  fontWeight: 400,
                  maxWidth: 500
                }}
              >
                Trendy fashion at unbeatable prices. Shop the latest collections
                and express yourself with confidence.
              </Typography>

              {/* CTA Buttons */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  onClick={() => navigate('/Shop')}
                  sx={{
                    bgcolor: 'white',
                    color: '#667eea',
                    px: 4,
                    py: 1.8,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: 3,
                    textTransform: 'none',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.95)',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 12px 32px rgba(0,0,0,0.2)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Shop Now
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/Shop')}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    px: 4,
                    py: 1.8,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: 3,
                    borderWidth: 2,
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.15)',
                      borderWidth: 2,
                      transform: 'translateY(-3px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Explore Collections
                </Button>
              </Box>

              {/* Stats */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 4,
                  mt: 5,
                  flexWrap: 'wrap'
                }}
              >
                {[
                  { value: '1000+', label: 'Products' },
                  { value: '5000+', label: 'Happy Customers' },
                  { value: '50+', label: 'Brands' }
                ].map((stat, index) => (
                  <Box key={index}>
                    <Typography
                      sx={{
                        fontSize: '2rem',
                        fontWeight: 800,
                        color: 'white',
                        mb: 0.5
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      sx={{
                        color: 'rgba(255,255,255,0.9)',
                        fontSize: '0.95rem'
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* Hero Image - Optional */}
           <Grid 
  item 
  xs={12} 
  md={5} 
  sx={{ 
    display: { xs: 'none', md: 'flex' },
    alignItems: 'center',
    justifyContent: 'center'
  }}
>
  <Box
    component="img"
    src={homePage}
    alt="Shopping"
    sx={{
      width: '100%',
      maxWidth: 420,
      height: 'auto',
      objectFit: 'contain'
    }}
  />
</Grid>


          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box
        sx={{
          bgcolor: '#f8f9fa',
          py: 6
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {[
              {
                icon: <LocalShipping sx={{ fontSize: 40 }} />,
                title: 'Free Shipping',
                description: 'On orders over ₹999'
              },
              {
                icon: <Security sx={{ fontSize: 40 }} />,
                title: 'Secure Payment',
                description: '100% secure transactions'
              },
              {
                icon: <ThumbUp sx={{ fontSize: 40 }} />,
                title: 'Quality Products',
                description: 'Guaranteed satisfaction'
              }
            ].map((feature, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 3,
                    borderRadius: 3,
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <Box
                    sx={{
                      color: '#667eea',
                      mb: 2
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: '#333'
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: '#666',
                      fontSize: '0.95rem'
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}