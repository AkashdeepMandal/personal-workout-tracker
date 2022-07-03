import { Button, styled } from "@mui/material";

export const NavButton = styled(Button)(({ theme, variant, size }) => ({
  textTransform: "none",
  fontWeight: "600",
  ...(variant === "text" && {
    color: theme.palette.shades.light,
    "&:hover": {
      color: theme.palette.shades.main,
    },
  }),
  ...(variant === "outlined" && {
    backgroundColor: theme.palette.shades.light,
    border: "3px solid",
    borderColor: theme.palette.primary.dark,
    borderRadius: "12px",
    "&:hover": {
      backgroundColor: theme.palette.shades.main,
      border: "3px solid",
      borderColor: theme.palette.primary.dark,
    },
    [theme.breakpoints.down("sm")]: {
      border: "3px solid",
      borderColor: theme.palette.primary.dark,
    },
  }),
}));
