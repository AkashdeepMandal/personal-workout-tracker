import { Form, Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { useSelector } from "react-redux";

// material-ui
import {
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
  Collapse,
  Alert,
  useTheme,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { adminCreatUser } from "../../../apis/admin";
import FormFieldControl from "../../../components/form-control/FormControl";

function CreateUser() {
  const { user } = useSelector((state) => state.user);
  const [alartIsOpen, setAlartIsOpen] = useState(true);
  const [successAlartIsOpen, setSuccessAlartIsOpen] = useState(true);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);
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
                      <FormFieldControl
                        control="password"
                        label="New Password*"
                        name="password"
                        inputprops={{ maxLength: 20 }}
                        value={values.password}
                        error={touched.password && errors.password}
                        errorMsg={errors.password}
                        {...rest}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormFieldControl
                        control="password"
                        label="Confirm  Password*"
                        name="confirmPassword"
                        inputprops={{ maxLength: 20 }}
                        value={values.confirmPassword}
                        error={
                          touched.confirmPassword && errors.confirmPassword
                        }
                        errorMsg={errors.confirmPassword}
                        {...rest}
                      />
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
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default CreateUser;
