import React from "react";
import { Box, Container, Typography, Button, styled } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import UnauthorizedImg from "../../assets/unauthorized.png";

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  maxHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

const Unauthorized = () => {
  return (
    <Container>
      <ContentStyle sx={{ textAlign: "center", alignItems: "center" }}>
        <Typography variant="h5" fontWeight={600} mb={2}>
          Unauthorized access
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Access is allowed only for registered user. Please login before
          accessing this page.
        </Typography>

        <Box
          component="img"
          src={UnauthorizedImg}
          sx={{ height: 340, mx: "auto" }}
        />

        <Button
          to="/sign-in"
          size="large"
          variant="contained"
          component={RouterLink}
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          Login
        </Button>
      </ContentStyle>
    </Container>
  );
};

export default Unauthorized;
