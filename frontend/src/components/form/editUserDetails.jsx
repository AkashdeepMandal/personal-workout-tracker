import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import moment from "moment";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { updateUserDetails, getUserDetails } from "../../apis/allUser";

function EditUserDetails() {
  const { user } = useSelector((state) => state.user);
  const [userDetails, setUserDetails] = useState({});
  const [alartIsOpen, setAlartIsOpen] = useState(true);
  const [successAlartIsOpen, setSuccessAlartIsOpen] = useState(true);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    async function fetchUser() {
      await getUserDetails(user.authToken)
        .then((res) => setUserDetails(res.data))
        .catch((error) => setUserDetails({}));
    }
    fetchUser();

    // eslint-disable-next-line
  }, [formSuccess]);

  const initialvalues = {
    firstName: userDetails.firstName ? userDetails.firstName : "",
    lastName: userDetails.lastName ? userDetails.lastName : "",
    dob: userDetails.dob
      ? moment(userDetails.dob).format(moment.HTML5_FMT.DATE)
      : "1989-08-12",
    contactNumber: userDetails.contactNumber ? userDetails.contactNumber : "",
    address: userDetails.address ? userDetails.address : "",
  };

  const validationSchema = yup.object().shape({
    firstName: yup.string().max(255).required("First name is required"),
    lastName: yup.string().max(255).required("Last name is required"),
    dob: yup
      .date()
      .max(
        new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000),
        "Should be 18 year old"
      )
      .required(" Date of Birth is required"),
    contactNumber: yup.number().required("Contact number is required"),
    address: yup.string(),
  });

  const onSubmit = async (value, props) => {
    await updateUserDetails(user.authToken, { ...value })
      .then((res) => {
        setFormSuccess("Account details updated Successfully");
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
    <Box
      py={4}
      px={2}
      sx={{
        backgroundColor: "#ffffff",
        boxShadow: "0 0 12px #ccc",
        borderRadius: "6px",
      }}
    >
      <Typography variant="h4" py={2} sx={{ fontWeight: 600 }}>
        Edit details
      </Typography>
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
        enableReinitialize
        initialValues={initialvalues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          handleReset,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit} onReset={handleReset}>
            <Grid container spacing={2}>
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
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isConfirmed}
                      onChange={(event) => setIsConfirmed(event.target.checked)}
                      name="checked"
                      color="primary"
                      size="small"
                    />
                  }
                  label={
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      color={theme.palette.grey[800]}
                    >
                      Confirm details
                    </Typography>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" spacing={1}>
                  <Button
                    fullWidth
                    size="medium"
                    sx={{
                      fontWeight: 600,
                      textTransform: "capitalize",
                    }}
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isConfirmed ? false : true}
                  >
                    Update Details
                  </Button>
                  <Button
                    type="reset"
                    variant="outlined"
                    color="error"
                    sx={{ textTransform: "capitalize" }}
                  >
                    Reset
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default EditUserDetails;
