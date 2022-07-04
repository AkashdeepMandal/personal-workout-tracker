import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { useSelector } from "react-redux";

import { Link as RouterLink } from "react-router-dom";

// material-ui
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Radio,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Collapse,
  Alert,
  useTheme,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import { adminCreatUser } from "../../../apis/admin";

function CreateUser() {
  const { user } = useSelector((state) => state.user);
  const [alartIsOpen, setAlartIsOpen] = useState(true);
  const [successAlartIsOpen, setSuccessAlartIsOpen] = useState(true);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const theme = useTheme();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // formik props
  const initialValues = {
    role: "",
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    email: "",
    contactNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = yup.object().shape({
    role: yup.string().required("Role is required"),
    firstName: yup.string().max(255).required("First name is required"),
    lastName: yup.string().max(255).required("Last name is required"),
    dob: yup
      .date()
      .max(
        new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000),
        "Should be 18 year old"
      )
      .required(" Date of Birth is required"),
    gender: yup.string().required("Gender is required"),
    email: yup
      .string()
      .email("Enter valid Email")
      .required("Email is required"),
    contactNumber: yup.number().required("Contact number is required"),
    address: yup.string(),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password is too short - should be minimum 8 character.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain atleast one number, uppercase, lowercase and special character"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Password is required"),
  });

  const onSubmit = async (value, props) => {
    const { confirmPassword, ...rest } = value;
    await adminCreatUser(user.authToken, { ...rest })
      .then((res) => {
        setFormSuccess("Registration Successful");
        props.resetForm();
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
    <Box>
      <Typography
        variant="h4"
        component="h1"
        fontWeight={600}
        sx={{
          fontSize: { xs: "24px", sm: "28px" },
          color: theme.palette.grey[800],
        }}
      >
        Create New User
      </Typography>
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
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, color: theme.palette.grey[800] }}
            >
              Enter User Details Here
            </Typography>
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
            {formSuccess && (
              <Collapse in={successAlartIsOpen}>
                <Alert
                  severity="success"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setSuccessAlartIsOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  {formSuccess}
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
                setFieldValue,
                touched,
                values,
              }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">Role*</FormLabel>
                          <RadioGroup
                            row
                            name="role"
                            value={values.role}
                            onChange={(event) => {
                              setFieldValue("role", event.currentTarget.value);
                            }}
                          >
                            <FormControlLabel
                              value="admin"
                              control={<Radio />}
                              label="Admin"
                            />
                            <FormControlLabel
                              value="trainer"
                              control={<Radio />}
                              label="Trainer"
                            />
                            <FormControlLabel
                              value="trainee"
                              control={<Radio />}
                              label="Trainee"
                            />
                          </RadioGroup>
                        </FormControl>
                        {touched.role && errors.role && (
                          <FormHelperText error id="helper-text-role">
                            {errors.role}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="firstName">First Name*</InputLabel>
                        <OutlinedInput
                          id="firstName"
                          type="firstName"
                          value={values.firstName}
                          name="firstName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="John"
                          fullWidth
                          error={Boolean(touched.firstName && errors.firstName)}
                        />
                        {touched.firstName && errors.firstName && (
                          <FormHelperText error id="helper-text-firstName">
                            {errors.firstName}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="lastname">Last Name*</InputLabel>
                        <OutlinedInput
                          fullWidth
                          error={Boolean(touched.lastName && errors.lastName)}
                          id="lastName"
                          type="lastName"
                          value={values.lastName}
                          name="lastName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Doe"
                          inputProps={{}}
                        />
                        {touched.lastName && errors.lastName && (
                          <FormHelperText error id="helper-text-lastName">
                            {errors.lastName}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="dob">Date of Birth*</InputLabel>
                        <OutlinedInput
                          fullWidth
                          error={Boolean(touched.dob && errors.dob)}
                          id="dob"
                          type="date"
                          value={values.dob}
                          name="dob"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="2017-05-24"
                          inputProps={{}}
                        />
                        {touched.dob && errors.dob && (
                          <FormHelperText error id="helper-text-dob">
                            {errors.dob}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="contactNumber">
                          Contact Number*
                        </InputLabel>
                        <OutlinedInput
                          fullWidth
                          error={Boolean(
                            touched.contactNumber && errors.contactNumber
                          )}
                          id="contactNumber"
                          type="tel"
                          value={values.contactNumber}
                          name="contactNumber"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="+1 1111111111"
                          inputProps={{}}
                        />
                        {touched.contactNumber && errors.contactNumber && (
                          <FormHelperText error id="helper-text-contactNumber">
                            {errors.contactNumber}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">Gender*</FormLabel>
                          <RadioGroup
                            row
                            name="gender"
                            value={values.gender}
                            onChange={(event) => {
                              setFieldValue(
                                "gender",
                                event.currentTarget.value
                              );
                            }}
                          >
                            <FormControlLabel
                              value="male"
                              control={<Radio />}
                              label="Male"
                            />
                            <FormControlLabel
                              value="female"
                              control={<Radio />}
                              label="Female"
                            />
                            <FormControlLabel
                              value="other"
                              control={<Radio />}
                              label="other"
                            />
                          </RadioGroup>
                        </FormControl>
                        {touched.gender && errors.gender && (
                          <FormHelperText error id="helper-text-gender">
                            {errors.gender}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>

                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="email">Email Address*</InputLabel>
                        <OutlinedInput
                          fullWidth
                          error={Boolean(touched.email && errors.email)}
                          id="email"
                          type="email"
                          value={values.email}
                          name="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="demo@example.com"
                          inputProps={{}}
                        />
                        {touched.email && errors.email && (
                          <FormHelperText error id="helper-text-email">
                            {errors.email}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="address">Address</InputLabel>
                        <OutlinedInput
                          fullWidth
                          error={Boolean(touched.address && errors.address)}
                          id="address"
                          multiline
                          rows={3}
                          type="text"
                          value={values.address}
                          name="address"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="123 Main Street, New York, NY 10030"
                          inputProps={{}}
                        />
                        {touched.address && errors.address && (
                          <FormHelperText error id="helper-text-address">
                            {errors.address}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="password-signup">
                          Password*
                        </InputLabel>
                        <OutlinedInput
                          fullWidth
                          error={Boolean(touched.password && errors.password)}
                          id="password-signup"
                          type={showPassword ? "text" : "password"}
                          value={values.password}
                          name="password"
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e);
                          }}
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
                          placeholder="******"
                          inputProps={{}}
                        />
                        {touched.password && errors.password && (
                          <FormHelperText
                            error
                            id="helper-text-password-signup"
                          >
                            {errors.password}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="confirmPassword">
                          Confirm Password*
                        </InputLabel>
                        <OutlinedInput
                          fullWidth
                          error={Boolean(
                            touched.confirmPassword && errors.confirmPassword
                          )}
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={values.confirmPassword}
                          name="confirmPassword"
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                size="large"
                              >
                                {showConfirmPassword ? (
                                  <VisibilityIcon />
                                ) : (
                                  <VisibilityOffIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          placeholder="******"
                          inputProps={{}}
                        />
                        {touched.confirmPassword && errors.confirmPassword && (
                          <FormHelperText
                            error
                            id="helper-text-confirmPassword"
                          >
                            {errors.confirmPassword}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        By Signing up, you agree to our &nbsp;
                        <Link variant="subtitle2" component={RouterLink} to="#">
                          Terms of Service
                        </Link>
                        &nbsp; and &nbsp;
                        <Link variant="subtitle2" component={RouterLink} to="#">
                          Privacy Policy
                        </Link>
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Create Account
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default CreateUser;
