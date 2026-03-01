import React from "react";
import {
  Card, CardMedia, CardContent, CardActions,
  Typography, IconButton, Box, Chip, Rating
} from "@mui/material";
import { 
  FavoriteBorder, ShoppingCart, Visibility 
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../ContextProvider";
import { useContext } from "react";

export default function ModernCards({ product }) {
  const { host } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        border: '1px solid #e0e0e0',
        position: 'relative',
        bgcolor: 'white',
        '&:hover': {
          transform: 'translateY(-10px)',
          boxShadow: '0 12px 40px rgba(102, 126, 234, 0.15)',
          borderColor: '#667eea',
          '& .quick-actions': {
            opacity: 1,
            transform: 'translateY(0)'
          }
        }
      }}
    >
      {/* Badge */}
      {product.product_qty < 10 && (
        <Chip
          label={product.product_qty === 0 ? "Out of Stock" : "Low Stock"}
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            zIndex: 2,
            bgcolor: product.product_qty === 0 ? '#ff4757' : '#ffa502',
            color: 'white',
            fontWeight: 700,
            fontSize: '0.75rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}
        />
      )}

      {/* Quick Actions */}
      <Box
        className="quick-actions"
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          opacity: 0,
          transform: 'translateY(-10px)',
          transition: 'all 0.3s ease'
        }}
      >
        <IconButton
          size="small"
          sx={{
            bgcolor: 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: '#ff4757',
              color: 'white',
              transform: 'scale(1.15)',
              boxShadow: '0 4px 12px rgba(255, 71, 87, 0.3)'
            }
          }}
        >
          <FavoriteBorder fontSize="small" />
        </IconButton>
        
        <IconButton
          size="small"
          onClick={() => navigate(`/product/${product._id}`)}
          sx={{
            bgcolor: 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: '#667eea',
              color: 'white',
              transform: 'scale(1.15)',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
            }
          }}
        >
          <Visibility fontSize="small" />
        </IconButton>
      </Box>

      {/* Product Image */}
      <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
        <Box
          sx={{
            position: 'relative',
            paddingTop: '100%',
            background: 'linear-gradient(to bottom, #f8f9fa 0%, #e9ecef 100%)',
            overflow: 'hidden'
          }}
        >
          <CardMedia
            component="img"
           image={product.product_image}
            alt={product.product_name}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              padding: 2,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.08)'
              }
            }}
          />
        </Box>
      </Link>

      {/* Product Details */}
      <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
        {/* Category */}
        <Typography
          variant="caption"
          sx={{
            color: '#667eea',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 1,
            fontSize: '0.7rem'
          }}
        >
          {product.category_name}
        </Typography>

        {/* Product Name */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: '1rem',
            mb: 1.5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: 1.4,
            minHeight: '2.8em',
            color: '#333'
          }}
        >
          {product.product_name}
        </Typography>

        {/* Rating */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          <Rating value={4.5} precision={0.5} size="small" readOnly />
          <Typography variant="caption" sx={{ ml: 1, color: '#666', fontWeight: 600 }}>
            (128)
          </Typography>
        </Box>

        {/* Price */}
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: '#667eea'
            }}
          >
            ₹{product.product_price}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textDecoration: 'line-through',
              color: '#999',
              fontWeight: 500
            }}
          >
            ₹{Math.round(product.product_price * 1.3)}
          </Typography>
          <Chip
            label={`${Math.round(((product.product_price * 1.3 - product.product_price) / (product.product_price * 1.3)) * 100)}% OFF`}
            size="small"
            sx={{
              bgcolor: '#4caf50',
              color: 'white',
              fontWeight: 700,
              fontSize: '0.7rem',
              height: 20
            }}
          />
        </Box>
      </CardContent>

      {/* Add to Cart Button */}
      <CardActions sx={{ p: 2.5, pt: 0 }}>
        <Box
          sx={{
            width: '100%',
            bgcolor: '#667eea',
            color: 'white',
            py: 1.5,
            px: 2,
            borderRadius: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
            '&:hover': {
              bgcolor: '#5568d3',
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)'
            }
          }}
        >
          <ShoppingCart fontSize="small" />
          <Typography variant="body2" fontWeight={700}>
            Add to Cart
          </Typography>
        </Box>
      </CardActions>
    </Card>
  );
}