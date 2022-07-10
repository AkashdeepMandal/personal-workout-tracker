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
  const [alartIsOpen, setAlartIsOpen] = useState(false);
  const [formAlert, setFormAlert] = useState({ severity: null, msg: "" });

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
        setFormAlert({
          severity: "success",
          msg: "Password changed Successfully",
        });
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
    <Card sx={{ boxShadow: "0 0 12px #ccc" }}>
      <CardContent>
        <Typography variant="h5" py={2} sx={{ fontWeight: 600 }}>
          Change Password
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
                    name="confirmNewPassword"
                    inputprops={{ maxLength: 20 }}
                    value={values.confirmNewPassword}
                    error={
                      touched.confirmNewPassword && errors.confirmNewPassword
                    }
                    errorMsg={errors.confirmNewPassword}
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
