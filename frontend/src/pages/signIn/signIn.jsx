import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/slices/userSlice";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
  Container,
  Alert,
  Collapse,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { login } from "../../apis/allUser";
import FormFieldControl from "../../components/form-control/FormControl";

function SignIn() {
  const { isLoggedIn } = useSelector((state) => state.user);
  const [alartIsOpen, setAlartIsOpen] = useState(false);
  const [formError, setFormError] = useState(null);

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
              {({ errors, touched, values, ...rest }) => (
                <Form>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <FormFieldControl
                        control="input"
                        label="E-mail*"
                        name="email"
                        placeholder="demo@example.com"
                        inputprops={{ maxLength: 50 }}
                        value={values.email}
                        error={touched.email && errors.email}
                        errorMsg={errors.email}
                        {...rest}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormFieldControl
                        control="password"
                        label="Password*"
                        name="password"
                        inputprops={{ maxLength: 20 }}
                        value={values.password}
                        error={touched.password && errors.password}
                        errorMsg={errors.password}
                        {...rest}
                      />
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
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default SignIn;
