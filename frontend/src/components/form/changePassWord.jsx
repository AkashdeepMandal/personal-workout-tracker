import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Collapse,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import { updateUserDetails } from "../../apis/allUser";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import FormFieldControl from "../form-control/FormControl";

function ChangePassWord() {
  const { user } = useSelector((state) => state.user);
  const [alartIsOpen, setAlartIsOpen] = useState(true);
  const [successAlartIsOpen, setSuccessAlartIsOpen] = useState(true);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);

  const initialvalues = {
    newPassword: "",
    confirmNewPassword: "",
  };

  const validationSchema = yup.object().shape({
    newPassword: yup
      .string()
      .required("Password is required")
      .min(8, "Password is too short - should be minimum 8 character.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain atleast one number, uppercase, lowercase and special character"
      ),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Passwords must match")
      .required("Password is required"),
  });

  const onSubmit = async (value, props) => {
    const password = value.confirmNewPassword;
    await updateUserDetails(user.authToken, { password })
      .then((res) => {
        setFormSuccess("Password changed successful");
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
    <Card sx={{ boxShadow: "0 0 12px #ccc" }}>
      <CardContent>
        <Typography variant="h5" py={2} sx={{ fontWeight: 600 }}>
          Change Password
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
              Password Updated
            </Alert>
          </Collapse>
        )}
        <Formik
          initialValues={initialvalues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, values, ...rest }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormFieldControl
                    control="password"
                    label="New Password*"
                    name="newPassword"
                    inputprops={{ maxLength: 20 }}
                    value={values.newPassword}
                    error={touched.newPassword && errors.newPassword}
                    errorMsg={errors.newPassword}
                    {...rest}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormFieldControl
                    control="password"
                    label="Confirm Password*"
                    name="confirmPassword"
                    inputprops={{ maxLength: 20 }}
                    value={values.confirmPassword}
                    error={touched.confirmPassword && errors.confirmPassword}
                    errorMsg={errors.confirmPassword}
                    {...rest}
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
                    >
                      Update Password
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
      </CardContent>
    </Card>
  );
}

export default ChangePassWord;
