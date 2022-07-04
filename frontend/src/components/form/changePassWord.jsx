import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Collapse,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { updateUserDetails } from "../../apis/allUser";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";

function ChangePassWord() {
  const { user } = useSelector((state) => state.user);
  const [alartIsOpen, setAlartIsOpen] = useState(true);
  const [successAlartIsOpen, setSuccessAlartIsOpen] = useState(true);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="newPassword">New Password</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.newPassword && errors.newPassword)}
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      value={values.newPassword}
                      name="newPassword"
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
                      placeholder="Enter new password"
                      inputProps={{}}
                    />
                    {touched.newPassword && errors.newPassword && (
                      <FormHelperText error id="helper-text-password-signup">
                        {errors.newPassword}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="confirmNewPassword">
                      Confirm New Password
                    </InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(
                        touched.confirmNewPassword && errors.confirmNewPassword
                      )}
                      id="confirmNewPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={values.confirmNewPassword}
                      name="confirmNewPassword"
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
                      placeholder="Enter Confirm Password"
                      inputProps={{}}
                    />
                    {touched.confirmNewPassword && errors.confirmNewPassword && (
                      <FormHelperText error id="helper-text-confirmPassword">
                        {errors.confirmNewPassword}
                      </FormHelperText>
                    )}
                  </Stack>
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
            </form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}

export default ChangePassWord;
