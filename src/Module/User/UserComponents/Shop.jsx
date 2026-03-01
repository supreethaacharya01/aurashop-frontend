import React, { useEffect, useState, useContext } from "react";
import Cards from "./Cards";
import axios from "axios";
import { 
  TextField, Box, Grid, Typography, Container, 
  Chip, Paper, InputAdornment, Skeleton 
} from "@mui/material";
import { Search, FilterList } from "@mui/icons-material";
import { UserContext } from "../../../ContextProvider";

// Category images
import menImg from "../../../Assets/mens.jpg";
import womenImg from "../../../Assets/women.jpg";
import footwearImg from "../../../Assets/Footwear.jpg";
import kidsImg from "../../../Assets/kids.jpg";
import accesseriesImg from "../../../Assets/accesseries.jpg";

export default function ModernShop() {
  const { host } = useContext(UserContext);

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch Categories
  useEffect(() => {
    axios
      .get(`${host}/api/category/Getcategory`)
      .then((res) => {
        setCategories(res.data.getcategory || []);
      })
      .catch((err) => console.log(err));
  }, [host]);

  // Fetch Products
  useEffect(() => {
    axios
      .get(`${host}/api/product/Getproduct`)
      .then((res) => {
        setProducts(res.data.getproduct || []);
        setAllProducts(res.data.getproduct || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [host]);

  // Search handler
  const handleSearch = (value) => {
    setQuery(value);
    filterProducts(value, selectedCategory);
  };

  // Category click handler
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    filterProducts(query, categoryId);
  };

  // Filter Logic
  const filterProducts = (searchText, categoryId) => {
    let filtered = allProducts;

    if (searchText) {
      filtered = filtered.filter((item) =>
        item.product_name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (categoryId) {
      filtered = filtered.filter(
        (item) => item.categoryId?.toString() === categoryId
      );
    }

    setProducts(filtered);
  };

  // Category Image Mapping
 const getCategoryImage = (categoryName) => {
    if (!categoryName) return menImg;
    const name = categoryName.toLowerCase().trim();

    // ⚠️ women must be checked BEFORE men (because "women" contains "men")
    if (name.includes("women")) return womenImg;
    if (name.includes("kids") || name.includes("children")) return kidsImg;
    if (name.includes("footwar") || name.includes("footwear") || name.includes("shoe")) return footwearImg;
    if (name.includes("accessor")) return accesseriesImg;
    if (name.includes("men")) return menImg;  // ← men must be LAST

    return menImg;
};

  return (
    <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh', pb: 6 }}>
      {/* Hero Banner - Same gradient as Hero section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          mb: 4,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Animated Background Elements - Same as Hero */}
        <Box
          sx={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            top: '-200px',
            right: '-100px',
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
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            bottom: '-100px',
            left: '-50px',
            animation: 'float 8s ease-in-out infinite',
            animationDelay: '1s'
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 900, 
              mb: 2,
              textShadow: '2px 2px 8px rgba(0,0,0,0.2)',
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            Explore Our Collection
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              opacity: 0.95, 
              mb: 4,
              fontWeight: 400,
              fontSize: { xs: '1.1rem', md: '1.3rem' }
            }}
          >
            Discover {allProducts.length}+ premium products tailored for you
          </Typography>

          {/* Search Bar */}
          <TextField
            fullWidth
            placeholder="Search for products, brands, categories..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            sx={{
              maxWidth: 600,
              bgcolor: 'white',
              borderRadius: 3,
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              '& .MuiOutlinedInput-root': {
                '& fieldset': { border: 'none' },
                '&:hover': {
                  boxShadow: '0 12px 32px rgba(0,0,0,0.2)'
                }
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#667eea', fontSize: 28 }} />
                </InputAdornment>
              ),
              sx: { 
                py: 0.5,
                fontSize: '1.1rem'
              }
            }}
          />
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Category Filter Section */}
        <Paper 
          elevation={0}
          sx={{ 
            p: 4, 
            mb: 4, 
            borderRadius: 3,
            bgcolor: 'white',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <FilterList sx={{ color: '#667eea', mr: 1, fontSize: 28 }} />
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700,
                color: '#333'
              }}
            >
              Shop by Category
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              overflowX: 'auto',
              pb: 1,
              '&::-webkit-scrollbar': {
                height: 6
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: '#f0f0f0',
                borderRadius: 3
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#667eea',
                borderRadius: 3,
                '&:hover': {
                  backgroundColor: '#5568d3'
                }
              }
            }}
          >
            {/* All Category */}
            <Box
              onClick={() => handleCategoryClick("")}
              sx={{
                minWidth: 90,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  transform: 'translateY(-4px)'
                }
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  border: selectedCategory === '' 
                    ? '3px solid #667eea' 
                    : '2px solid #e0e0e0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: 16,
                  bgcolor: selectedCategory === '' 
                    ? 'rgba(102, 126, 234, 0.15)' 
                    : 'white',
                  color: '#667eea',
                  mb: 1,
                  mx: 'auto',
                  boxShadow: selectedCategory === '' 
                    ? '0 4px 12px rgba(102, 126, 234, 0.3)' 
                    : '0 2px 6px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease'
                }}
              >
                ALL
              </Box>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: selectedCategory === '' ? 700 : 600,
                  color: selectedCategory === '' ? '#667eea' : '#333',
                  fontSize: '0.85rem'
                }}
              >
                All
              </Typography>
            </Box>

            {/* Category List */}
            {categories.map((cat) => (
              <Box
                key={cat._id}
                onClick={() => handleCategoryClick(cat._id)}
                sx={{
                  minWidth: 90,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    border: selectedCategory === cat._id 
                      ? '3px solid #667eea' 
                      : '2px solid #e0e0e0',
                    overflow: 'hidden',
                    mb: 1,
                    mx: 'auto',
                    boxShadow: selectedCategory === cat._id 
                      ? '0 4px 12px rgba(102, 126, 234, 0.3)' 
                      : '0 2px 6px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <img
                    src={getCategoryImage(cat.category_name)}
                    alt={cat.category_name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: selectedCategory === cat._id ? 700 : 600,
                    color: selectedCategory === cat._id ? '#667eea' : '#333',
                    fontSize: '0.85rem'
                  }}
                >
                  {cat.category_name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>

        {/* Results Header */}
        <Box 
          sx={{ 
            mb: 3, 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2
          }}
        >
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 700,
              color: '#333'
            }}
          >
            {products.length} Products Found
          </Typography>
          {selectedCategory && (
            <Chip
              label="Clear Filter"
              onDelete={() => handleCategoryClick("")}
              sx={{
                bgcolor: '#667eea',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.95rem',
                py: 2.5,
                '& .MuiChip-deleteIcon': {
                  color: 'white',
                  '&:hover': {
                    color: '#f0f0f0'
                  }
                },
                '&:hover': {
                  bgcolor: '#5568d3'
                }
              }}
            />
          )}
        </Box>

        {/* Product Grid */}
        {loading ? (
          <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
                <Skeleton 
                  variant="rectangular" 
                  height={350} 
                  sx={{ borderRadius: 3 }} 
                />
                <Skeleton height={40} sx={{ mt: 1 }} />
                <Skeleton height={30} />
              </Grid>
            ))}
          </Grid>
        ) : products.length > 0 ? (
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                <Cards product={product} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper 
            sx={{ 
              p: 10, 
              textAlign: 'center',
              borderRadius: 3,
              border: '2px dashed #e0e0e0',
              bgcolor: 'white'
            }}
          >
            <Typography 
              variant="h4" 
              sx={{ 
                mb: 2, 
                fontWeight: 700,
                color: '#333'
              }}
            >
              No Products Found
            </Typography>
            <Typography 
              variant="h6"
              sx={{ 
                color: '#666',
                fontWeight: 400
              }}
            >
              Try adjusting your search or filter criteria
            </Typography>
          </Paper>
        )}
      </Container>
    </Box>
  );
}
