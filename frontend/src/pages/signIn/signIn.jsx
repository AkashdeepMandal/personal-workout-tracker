import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/slices/userSlice";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useTheme,
  Container,
  Alert,
  Collapse,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import { login } from "../../apis/requests";

function SignIn() {
  const { isLoggedIn } = useSelector((state) => state.user);
  const [alartIsOpen, setAlartIsOpen] = useState(false);
  const [formError, setFormError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);

  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [isLoggedIn]);

  // toggle password
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // remember me checkbox
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid Email")
      .max(255)
      .required("Email required"),
    password: yup.string().max(255).required("Password required"),
  });

  const onSubmit = async (value, props) => {
    await login({ ...value })
      .then((res) => {
        dispatch(loginUser(res.data));
        navigate("/user/dashboard");
      })
      .catch((error) => {
        if (error.response.data) {
          setFormError(error.response.data.error.message);
        } else {
          setFormError("Please Check Network Connection");
        }
        setAlartIsOpen(true);
      });
  };
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          maxWidth: "500px",
          margin: "18px auto",
          padding: "32px",
          borderRadius: "12px",
          boxShadow: "0 0 12px #ccc",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
              sx={{ mb: { xs: -0.5, sm: 0.5 } }}
            >
              <Typography variant="h3">Login</Typography>
              <Typography
                component={RouterLink}
                to="/sign-up"
                variant="body1"
                sx={{ textDecoration: "none" }}
                color="primary"
              >
                Don&apos;t have an account?
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            {formError && (
              <Collapse in={alartIsOpen}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setAlartIsOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  {formError}
                </Alert>
              </Collapse>
            )}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                touched,
                values,
              }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="email-login">
                          Email Address
                        </InputLabel>
                        <OutlinedInput
                          id="email-login"
                          type="email"
                          value={values.email}
                          name="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter email address"
                          fullWidth
                          error={Boolean(touched.email && errors.email)}
                        />
                        {touched.email && errors.email && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-email-login"
                          >
                            {errors.email}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="password-login">
                          Password
                        </InputLabel>
                        <OutlinedInput
                          fullWidth
                          error={Boolean(touched.password && errors.password)}
                          id="-password-login"
                          type={showPassword ? "text" : "password"}
                          value={values.password}
                          name="password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                size="large"
                              >
                                {showPassword ? (
                                  <VisibilityIcon />
                                ) : (
                                  <VisibilityOffIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          placeholder="Enter password"
                        />
                        {touched.password && errors.password && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-password-login"
                          >
                            {errors.password}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sx={{ mt: -1 }}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={checked}
                              onChange={(event) =>
                                setChecked(event.target.checked)
                              }
                              name="checked"
                              color="primary"
                              size="small"
                            />
                          }
                          label={
                            <Typography variant="h6">
                              Keep me sign in
                            </Typography>
                          }
                        />
                        <Typography
                          variant="h6"
                          component={RouterLink}
                          to=""
                          color="text.primary"
                        >
                          Forgot Password?
                        </Typography>
                      </Stack>
                    </Grid>
                    {errors.submit && (
                      <Grid item xs={12}>
                        <FormHelperText error>{errors.submit}</FormHelperText>
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        size="large"
                        sx={{
                          fontWeight: 600,
                          "&:hover": {
                            backgroundColor: theme.palette.primary.dark,
                          },
                        }}
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Login
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default SignIn;
