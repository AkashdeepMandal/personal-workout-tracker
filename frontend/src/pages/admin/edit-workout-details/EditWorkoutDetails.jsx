import { Formik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// material-ui
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
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
  Checkbox,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import {
  adminViewWorkoutDetails,
  adminUpdateWorkoutDetails,
} from "../../../apis/admin";

function EditWorkoutDetails({ id }) {
  const { user } = useSelector((state) => state.user);
  const [workoutDetails, setWorkoutDetails] = useState({});
  const [alartIsOpen, setAlartIsOpen] = useState(false);
  const [formAlert, setFormAlert] = useState({ severity: null, msg: "" });
  const [isConfirmed, setIsConfirmed] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    async function fetchUser() {
      await adminViewWorkoutDetails(user.authToken, id)
        .then((res) => setWorkoutDetails(res.data))
        .catch((error) => setWorkoutDetails({}));
    }
    fetchUser();

    // eslint-disable-next-line
  }, [alartIsOpen]);

  // formik props
  const initialValues = {
    category: workoutDetails.category ? workoutDetails.category : "",
    name: workoutDetails.name ? workoutDetails.name : "",
    calories: workoutDetails.calories ? workoutDetails.calories : "",
  };
  const validationSchema = yup.object().shape({
    category: yup.string().required("Category is required"),
    name: yup.string().max(255).required("Workout name is required"),
    calories: yup.number().max(10000).required("Calories required"),
  });

  const onSubmit = async (value, props) => {
    try {
      await adminUpdateWorkoutDetails(user.authToken, { ...value }, id);
      setFormAlert({
        severity: "success",
        msg: "Workout updated successfully",
      });
      props.resetForm();
    } catch (error) {
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
    }
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
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          handleReset,
          setFieldValue,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit} onReset={handleReset}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Category*</FormLabel>
                    <RadioGroup
                      row
                      name="category"
                      value={values.category}
                      onChange={(event) => {
                        setFieldValue("category", event.currentTarget.value);
                      }}
                    >
                      <FormControlLabel
                        value="strength"
                        control={<Radio />}
                        label="Strength"
                      />
                      <FormControlLabel
                        value="cardio"
                        control={<Radio />}
                        label="Cardio"
                      />
                    </RadioGroup>
                  </FormControl>
                  {touched.category && errors.category && (
                    <FormHelperText error id="helper-text-category">
                      {errors.category}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="name">Workout Name*</InputLabel>
                  <OutlinedInput
                    autoComplete="off"
                    id="name"
                    type="name"
                    value={values.name}
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Running"
                    fullWidth
                    error={Boolean(touched.name && errors.name)}
                  />
                  {touched.name && errors.name && (
                    <FormHelperText error id="helper-text-name">
                      {errors.name}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="calories">Calories*</InputLabel>
                  <OutlinedInput
                    autoComplete="off"
                    fullWidth
                    error={Boolean(touched.calories && errors.calories)}
                    id="calories"
                    type="calories"
                    value={values.calories}
                    name="calories"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="12"
                    inputProps={{}}
                  />
                  {touched.calories && errors.calories && (
                    <FormHelperText error id="helper-text-calories">
                      {errors.calories}
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

export default EditWorkoutDetails;
