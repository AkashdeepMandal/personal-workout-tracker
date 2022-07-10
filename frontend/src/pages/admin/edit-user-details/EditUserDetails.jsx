import React, { useState, useEffect } from "react";
import { Form, Formik } from "formik";
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
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import {
  adminViewUserDetails,
  adminUpdateUserDetails,
} from "../../../apis/admin";
import FormFieldControl from "../../../components/form-control/FormControl";

function AdminEditUserDetails({ id }) {
  const { user } = useSelector((state) => state.user);
  const [userDetails, setUserDetails] = useState({});
  const [alartIsOpen, setAlartIsOpen] = useState(false);
  const [formAlert, setFormAlert] = useState({ severity: null, msg: "" });
  const [isConfirmed, setIsConfirmed] = useState(false);
  const theme = useTheme();

  const roleOptions = [
    { key: "Admin", value: "admin" },
    { key: "Trainer", value: "trainer" },
    { key: "Trainee", value: "trainee" },
  ];

  const genderOptions = [
    { key: "Male", value: "male" },
    { key: "Female", value: "female" },
    { key: "Other", value: "other" },
  ];

  useEffect(() => {
    async function fetchUser() {
      await adminViewUserDetails(user.authToken, id)
        .then((res) => setUserDetails(res.data))
        .catch((error) => setUserDetails({}));
    }
    fetchUser();

    // eslint-disable-next-line
  }, [alartIsOpen]);

  const initialvalues = {
    role: userDetails.role ? userDetails.role : "",
    firstName: userDetails.firstName ? userDetails.firstName : "",
    lastName: userDetails.lastName ? userDetails.lastName : "",
    dob: userDetails.dob
      ? moment(userDetails.dob).format(moment.HTML5_FMT.DATE)
      : "1989-08-12",
    gender: userDetails.gender ? userDetails.gender : "",
    email: userDetails.email ? userDetails.email : "",
    contactNumber: userDetails.contactNumber ? userDetails.contactNumber : "",
    address: userDetails.address ? userDetails.address : "",
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
  });

  const onSubmit = async (value, props) => {
    await adminUpdateUserDetails(user.authToken, { ...value }, id)
      .then((res) => {
        setFormAlert({ severity: "success", msg: "Registration Successful" });
        props.resetForm();
      })
      .catch((error) => {
        if (error.response.data) {
          setFormAlert({
            severity: "error",
            msg: error.response.data.error.message,
          });
        } else {
          setFormAlert({
            severity: "error",
            msg: "Please check your internet connection",
          });
        }
      });
    setAlartIsOpen(true);
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

      <Collapse in={alartIsOpen}>
        <Alert
          severity={formAlert.severity ? formAlert.severity : "success"}
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
          {formAlert.msg}
        </Alert>
      </Collapse>

      <Formik
        enableReinitialize
        initialValues={initialvalues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, setFieldValue, touched, values, ...rest }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormFieldControl
                  row={true}
                  control="radio"
                  label="Role*"
                  name="role"
                  value={values.role}
                  setFieldValue={setFieldValue}
                  options={roleOptions}
                  error={touched.role && errors.role}
                  errorMsg={errors.role}
                  {...rest}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormFieldControl
                  control="input"
                  label="First Name*"
                  name="firstName"
                  placeholder="John"
                  inputprops={{ maxLength: 100 }}
                  value={values.firstName}
                  error={touched.firstName && errors.firstName}
                  errorMsg={errors.firstName}
                  {...rest}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormFieldControl
                  control="input"
                  label="Last Name*"
                  name="lastName"
                  placeholder="Snow"
                  inputprops={{ maxLength: 100 }}
                  value={values.lastName}
                  error={touched.lastName && errors.lastName}
                  errorMsg={errors.lastName}
                  {...rest}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormFieldControl
                  control="date"
                  label="Date of Birth*"
                  name="dob"
                  value={values.dob}
                  error={touched.dob && errors.dob}
                  errorMsg={errors.dob}
                  {...rest}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormFieldControl
                  control="input"
                  label="Contact Number*"
                  name="contactNumber"
                  placeholder="1800 123 4567"
                  inputprops={{ maxLength: 16 }}
                  value={values.contactNumber}
                  error={touched.contactNumber && errors.contactNumber}
                  errorMsg={errors.contactNumber}
                  {...rest}
                />
              </Grid>
              <Grid item xs={12}>
                <FormFieldControl
                  row={true}
                  control="radio"
                  label="Gender*"
                  name="gender"
                  value={values.gender}
                  setFieldValue={setFieldValue}
                  options={genderOptions}
                  error={touched.gender && errors.gender}
                  errorMsg={errors.gender}
                  {...rest}
                />
              </Grid>

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
                  control="textarea"
                  label="Address"
                  name="address"
                  placeholder="123 Main Street, New York, NY 10030"
                  inputprops={{ maxLength: 50 }}
                  value={values.address}
                  error={touched.address && errors.address}
                  errorMsg={errors.address}
                  {...rest}
                />
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
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default AdminEditUserDetails;
