import React from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";

import menImg from "../../../Assets/mens.jpg";
import womenImg from "../../../Assets/women.jpg";
import kidsImg from "../../../Assets/kids.jpg";
import accesseriesImg from "../../../Assets/accesseries.jpg";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";


export default function TopDeals() {
  const deals = [
    { title: "Men's Fashion", offer: "Flat 40% OFF", img: menImg },
    { title: "Women's Collection", offer: "Up to 50% OFF", img: womenImg },
    { title: "Kids Wear", offer: "Starting at ₹199", img: kidsImg },
    { title: "Accessories", offer: "Up to 20% OFF", img: accesseriesImg },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Top Deals
      </Typography>

      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        loop={true}
        autoplay={{ delay: 2500 }}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination, Autoplay]}
        style={{ paddingBottom: "30px" }}
        breakpoints={{
          0: { slidesPerView: 1 },
          600: { slidesPerView: 2 },
          900: { slidesPerView: 3 },
        }}
      >
        {deals.map((deal, index) => (
          <SwiperSlide key={index}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <img
                src={deal.img}
                alt={deal.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "contain",
                  borderRadius: "12px 12px 0 0",
                }}
              />

              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6" fontWeight="bold">
                  {deal.title}
                </Typography>
                <Typography color="primary" sx={{ mb: 1 }}>
                  {deal.offer}
                </Typography>

                <Button variant="contained" size="small">
                  Shop Now
                </Button>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
