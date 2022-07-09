import React from "react";
import { Box, Container, Typography, Button, styled } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import page404 from "../../assets/404-icon.png";

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

const PageNotFound = () => {
  return (
    <Container>
      <ContentStyle sx={{ textAlign: "center", alignItems: "center" }}>
        <Typography variant="h5" fontWeight={600} mb={2}>
          Sorry, page not found!
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Sorry, we couldn't find the page you're looking for. Perhaps you've
          mistyped the URL? Be sure to check your spelling.
        </Typography>

        <Box component="img" src={page404} sx={{ height: 340, mx: "auto" }} />

        <Button
          to="/"
          size="large"
          variant="contained"
          component={RouterLink}
          startIcon={<ArrowBackIcon />}
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          Go to Home
        </Button>
      </ContentStyle>
    </Container>
  );
};

export default PageNotFound;
